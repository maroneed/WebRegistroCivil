/*Turno Tramite
USE [MS_TurnoTramite]
GO
DELETE FROM [dbo].[Turnos];
DELETE FROM [dbo].[Tramites];*/

/*Persona*/
USE [MSPersona]
GO
DELETE FROM [dbo].[ListaHijos];
UPDATE [dbo].[Persona]
   SET 
      [EstadoCivilId] = 4
      ,[TieneHijos] = 0
      ,[Fecha_Defuncion] = null;

/*DNI*/
USE [TramiteDNI.DB]
GO
DELETE FROM [dbo].[Extranjeros];
DELETE FROM [dbo].[Nacimientos];
DELETE FROM [dbo].[NuevosEjemplares];
DELETE FROM [dbo].[RecienNacidos];
DELETE FROM [dbo].[TramiteDNIs];
DELETE FROM [dbo].[TramiteNacimientos];

/*Matrimonio*/
USE [MS_TramiteMatrimonio]
GO
DELETE FROM [dbo].[TramiteMatrimonios];
DELETE FROM [dbo].[Contrayentes];

/*Defuncion*/
USE [APINacimientoDefuncion3Db]
GO
DELETE FROM [dbo].[PersonasFallecidas];
DELETE FROM [dbo].[PersonaTramites];
DELETE FROM [dbo].[TramiteDefunciones];

/*Divorcio*/
USE [APIDivorcioDb]
GO
DELETE FROM [dbo].[DomicilioConvivencia];
DELETE FROM [dbo].[Propuestas];
DELETE FROM [dbo].[TramiteDivorcios];

