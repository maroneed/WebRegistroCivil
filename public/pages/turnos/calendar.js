class Calendar {
    constructor(id){
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        // console.log(this.elCalendar);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body'); //siempre se coloca despues de que se crea el template
        // this.generateDates(moment());
        this.elMonthName = this.elCalendar.querySelector('.month-name'); //elemento que coloca el nombre del mes
        this.showCells();
    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControl();
    }

    getTemplate() {
        let template = `
        <div class="calendar__header">
            <button type="button" class="control control--prev">&lt;</button>
            <span class="month-name">Julio 2020</span>
            <button type="button" class="control control--next">&gt;</button>
        </div>
        <div class="calendar_body">
            <div class="grid">
                <div class="grid__header">
                    <span class="grid__cell grid__cell--gh">Lu</span>
                    <span class="grid__cell grid__cell--gh">Ma</span>
                    <span class="grid__cell grid__cell--gh">Mi</span>
                    <span class="grid__cell grid__cell--gh">Ju</span>
                    <span class="grid__cell grid__cell--gh">Vi</span>
                    <span class="grid__cell grid__cell--gh">Sa</span>
                    <span class="grid__cell grid__cell--gh">Do</span>
                </div>
                <div class="grid__body">
                    
                </div>
            </div>
        </div> 
        `;
        return template;
    }

    addEventListenerToControl() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        // console.log(elControls);
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    // console.log('siguiente');
                    this.changeMonth(true);
                }else {
                    // console.log('retroceder');
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }


    changeMonth(next = true) { //metodo para avanzar o retroceder un mes
        if (next) {
           this.currentMonth.add(1, 'months');
        }else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    //llamara a generateDates para mostrar los dias del mes
    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('no fue posible generar las fechas del calendario');
            return;
        }
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = ''; //reseteo cadena para asignarla nuevamente vacia y que no me deshabilite todos los meses
            if (!this.cells[i].isInCurrentMonth) { //deshabilito dias que no corresponden al mes
                disabledClass = 'grid__cell--disabled';
            }
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY'); //muestra 3 letras del mes y 4 digitos de año
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCell();
        // console.log(this.cells);
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        // console.log(dateStart, dateEnd);
        let cells = [];

        //encuentra primer fecha a mostrar en calendario
        while (dateStart.day() !== 1) { 
            dateStart.subtract(1, 'days');
        }

        //encuentra ultima fecha a mostrar en calendario
        while (dateEnd.day() !== 0) { 
            dateEnd.add(1, 'days');
        }

        //genera las fechas del grid (de nuestro calendario)
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        }while (dateStart.isSameOrBefore(dateEnd)) {
            return cells;
        }

        // console.log(cells);
        // console.log(dateStart, dateEnd);
    }

    addEventListenerToCell() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd'); //obtenemos las celdas
        elCells.forEach(elCell => { //recorremos para agregar el event
            elCell.addEventListener('click', e => {
                let elTarget = e.target; //obtenemos la celda que genero el evento
                // console.log(elTarget);
                // verifico si el elemento no representa un dia deshabilitado
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) { //verificacion para que no vuelva a selecionar la misma celda
                    return;
                }
                // deseleccionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                // console.log(elTarget);
                // seleccionar la nueva celda
                // console.log(this.cells[parseInt(elTarget.dataset.cellId)]);
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                elTarget.classList.add('grid__cell--selected');
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }

    getElement() { //obtengo dato
        return this.elCalendar;
    }

    value() { //retorna la fecha seleccionada
        return this.selectedDate;
    }
}