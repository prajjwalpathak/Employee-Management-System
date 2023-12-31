﻿/****** Object:  Database [ctintern]    Script Date: 07/13/2023 01:55:54 ******/
CREATE DATABASE [EMSDatabase]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ctintern', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ctintern.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ctintern_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ctintern_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ctintern] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ctintern].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ctintern] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ctintern] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ctintern] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ctintern] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ctintern] SET ARITHABORT OFF 
GO
ALTER DATABASE [ctintern] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ctintern] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ctintern] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ctintern] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ctintern] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ctintern] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ctintern] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ctintern] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ctintern] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ctintern] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ctintern] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ctintern] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ctintern] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ctintern] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ctintern] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ctintern] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ctintern] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ctintern] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ctintern] SET  MULTI_USER 
GO
ALTER DATABASE [ctintern] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ctintern] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ctintern] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ctintern] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ctintern] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ctintern] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ctintern] SET QUERY_STORE = ON
GO
ALTER DATABASE [ctintern] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ctintern]
GO
/****** Object:  Table [dbo].[admins]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[admins](
	[id] [int] IDENTITY(10001,1) NOT NULL,
	[hrmid] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[department] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[attendances]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[attendances](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[checkInTime] [nvarchar](255) NULL,
	[checkOutTime] [nvarchar](255) NULL,
	[checkInDate] [date] NULL,
	[checkOutDate] [date] NULL,
	[checkInLocation] [nvarchar](255) NULL,
	[checkOutLocation] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[notifications]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[notifications](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[notificationId] [nvarchar](255) NOT NULL,
	[content] [nvarchar](255) NOT NULL,
	[sender] [nvarchar](255) NOT NULL,
	[receiver] [nvarchar](255) NOT NULL,
	[date] [nvarchar](255) NOT NULL,
	[status] [nvarchar](255) NOT NULL,
	[type] [nvarchar](255) NULL,
 CONSTRAINT [PK_notification] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[profiles]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[profiles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[profileImage] [nvarchar](max) NULL,
	[hrmid] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[permanentAddress] [nvarchar](255) NULL,
	[city] [nvarchar](255) NULL,
	[state] [nvarchar](255) NULL,
	[country] [nvarchar](255) NULL,
	[emergencyPhone] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[projects]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[projects](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[projectName] [nvarchar](255) NULL,
	[clientName] [nvarchar](255) NULL,
	[assignedOn] [date] NULL,
	[completeBy] [date] NULL,
	[teamHead] [nvarchar](255) NULL,
	[teamMembers] [nvarchar](max) NULL,
	[department] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[requests]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[requests](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[email] [nvarchar](255) NULL,
	[startDate] [date] NULL,
	[endDate] [date] NULL,
	[date] [date] NULL,
	[leaveType] [nvarchar](255) NULL,
	[request] [nvarchar](255) NULL,
	[reason] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[skills]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[skills](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[primarySkills] [nvarchar](255) NULL,
	[secondarySkills] [nvarchar](255) NULL,
	[certifications] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[timesheets]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[timesheets](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[userId] [int] NULL,
	[timesheetId] [nvarchar](255) NULL,
	[timesheetName] [nvarchar](255) NULL,
	[clientName] [nvarchar](255) NULL,
	[projectName] [nvarchar](255) NULL,
	[jobName] [nvarchar](255) NULL,
	[workItem] [nvarchar](255) NULL,
	[date] [date] NULL,
	[week] [nvarchar](255) NULL,
	[description] [nvarchar](255) NULL,
	[totalTime] [nvarchar](255) NULL,
	[billableStatus] [nvarchar](255) NULL,
	[submittedHours] [nvarchar](255) NULL,
	[approvedHours] [nvarchar](255) NULL,
	[status] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [int] IDENTITY(10001,1) NOT NULL,
	[hrmid] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[email] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[role] [nvarchar](255) NULL,
	[department] [nvarchar](255) NULL,
	[location] [nvarchar](255) NULL,
	[joiningDate] [date] NULL,
	[reportingManager] [nvarchar](255) NULL,
	[reportsTo] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_deleteproject]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_deleteproject]
	 @id int 
AS 
BEGIN
	DELETE  FROM  dbo.projects
	WHERE id = @id
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getadmin]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getadmin]
	@adminId int 
AS 
BEGIN
	SELECT * FROM  dbo.admins 
	WHERE id = @adminId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getallusers]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getallusers] 
AS 
BEGIN
	SELECT dbo.users.id, dbo.users.hrmid, dbo.users.name, dbo.profiles.profileImage
	FROM dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getcurrentadmin]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getcurrentadmin]
	@email nvarchar(255)
AS
BEGIN
	SELECT * FROM dbo.admins
	WHERE email = @email
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getprojects]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getprojects]

AS 
BEGIN
	SELECT *
	FROM  dbo.projects
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getrangerequests]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getrangerequests]
	@startDate date, @endDate date
AS 
BEGIN
	SELECT dbo.requests.id, dbo.requests.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, email, startDate, endDate, date, leaveType, request, reason, status
	FROM  dbo.requests
	INNER JOIN dbo.profiles
	ON dbo.requests.userId = dbo.profiles.userId
	WHERE date >= @startDate 
	AND date <= @endDate
	ORDER BY date DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getrangetimesheets]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getrangetimesheets]
	@startDate date, @endDate date
AS 
BEGIN
	SELECT dbo.timesheets.timesheetId, dbo.timesheets.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, timesheetName, clientName, projectName, jobName, workItem, date, week, description, totalTime, billableStatus, submittedHours, approvedHours, status
	FROM  dbo.timesheets
	INNER JOIN dbo.profiles
	ON dbo.timesheets.userId = dbo.profiles.userId
	WHERE date >= @startDate 
	AND date <= @endDate
	ORDER BY date DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_getusers]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_getusers]
	@currentDate date
AS
BEGIN
	SELECT dbo.users.id, dbo.profiles.profileImage, dbo.users.hrmid, dbo.users.name, dbo.users.role, dbo.users.department, dbo.users.location, dbo.attendances.status
	FROM dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	LEFT JOIN dbo.attendances
	ON dbo.users.id = dbo.attendances.userId
	AND dbo.attendances.checkInDate = @currentDate
	AND dbo.attendances.id = (
           SELECT MAX(id)
           FROM dbo.attendances
           WHERE dbo.users.id = dbo.attendances.userId
        )
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_postproject]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_postproject]
	@projectName nvarchar(255), @clientName nvarchar(255), @assignedOn date, @completeBy date, @teamHead nvarchar(255), @teamMembers nvarchar(MAX), @department nvarchar(255)
AS 
BEGIN
	IF NOT EXISTS (SELECT projectName from dbo.projects WHERE projectName = @projectName)
	INSERT INTO dbo.projects(projectName, clientName, assignedOn, completeBy, teamHead, teamMembers, department, status)
	values (@projectName, @clientName, @assignedOn, @completeBy, @teamHead, @teamMembers, @department, 'In Progress')
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_postuser]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_postuser]
	@hrmid nvarchar(255), @name nvarchar(255), @email nvarchar(255), @phone nvarchar(255), @role nvarchar(255), @department nvarchar(255), @location nvarchar(255), @joiningDate date, @reportingManager nvarchar(255), @reportsTo nvarchar(255)
AS 
BEGIN
	IF NOT EXISTS (SELECT email from dbo.users WHERE email = @email)
	INSERT INTO dbo.users (hrmid, name, email, phone, role, department, location, joiningDate, reportingManager, reportsTo)
	values (@hrmid, @name, @email, @phone, @role, @department, @location, @joiningDate, @reportingManager, @reportsTo)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_updateadminsignup]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_updateadminsignup]
	@name nvarchar(255), @email nvarchar(255),@password nvarchar(255)
AS 
BEGIN
	UPDATE dbo.admins
	SET name = @name, email = @email, password = @password
	WHERE dbo.admins.email = @email
	SET NOCOUNT ON; 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_updateproject]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_updateproject]
	@projectName nvarchar(255), @completeBy date, @teamHead nvarchar(255), @teamMembers nvarchar(MAX), @status nvarchar(255)
AS 
BEGIN
	UPDATE dbo.projects
	SET completeBy = @completeBy, teamHead = @teamHead, teamMembers = @teamMembers, status = @status
	WHERE projectName = @projectName
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_admins_updateuser]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_admins_updateuser]
	@userId int, @role nvarchar(255), @department nvarchar(255), @location nvarchar(255)
AS 
BEGIN
	UPDATE dbo.users
	SET role = @role, department = @department, location = @location
	WHERE id = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_superadmins_postadmin]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_superadmins_postadmin]
	@hrmid nvarchar(255), @name nvarchar(255), @email nvarchar(255), @phone nvarchar(255), @department nvarchar(255)
AS 
BEGIN
	IF NOT EXISTS (SELECT email from dbo.admins WHERE email = @email)
	INSERT INTO dbo.admins (hrmid, name, email, phone, department)
	values (@hrmid, @name, @email, @phone, @department)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_deleteuserrequest]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_deleteuserrequest]
	 @userId int , @id int 
AS 
BEGIN
	DELETE  FROM  dbo.requests
	WHERE id = @id AND userId = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getallusers]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getallusers] 
AS 
BEGIN
	SELECT dbo.users.id, dbo.users.hrmid, dbo.users.name, dbo.profiles.profileImage
	FROM dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getcurrentuser]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getcurrentuser]
	@email nvarchar(255)
AS
BEGIN
	SELECT * FROM dbo.users
	WHERE email = @email
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getcurrentuserprofile]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getcurrentuserprofile]
	@email nvarchar(255)
AS 
BEGIN
	SELECT userId, profileImage, dbo.users.hrmid, dbo.users.name, role, department
	FROM  dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	WHERE dbo.users.email = @email
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getproject]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getproject]
	@id int 
AS 
BEGIN
	SELECT * FROM  dbo.projects
	WHERE id = @id
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuser]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuser]
	@userId int 
AS 
BEGIN
	SELECT * FROM  dbo.users 
	WHERE id = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuseraddedrequests]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuseraddedrequests]
	@userId int 
AS 
BEGIN
	SELECT leaveType, request, startDate, endDate FROM dbo.requests
	WHERE userId = @userId AND (status = 'Approved' OR status = 'Pending')
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuserattendance]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuserattendance]
	@userId int 
AS 
BEGIN
	SELECT * FROM  dbo.attendances
	WHERE userId = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusercurrentattendance]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusercurrentattendance]
	@userId int, @currentDate date
AS 
BEGIN
	SELECT TOP 1 * FROM  dbo.attendances
	WHERE userId = @userId AND checkInDate = @currentDate
	ORDER BY dbo.attendances.id DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusercurrentrequest]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusercurrentrequest]
	 @userId int , @id int 
AS 
BEGIN
	SELECT * FROM  dbo.requests
	WHERE id = @id AND userId =	@userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusernotifications]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_users_getusernotifications]
	@hrmid nvarchar(255)
AS 
BEGIN
	SELECT * 
	FROM dbo.notifications
	WHERE receiver = @hrmid
	ORDER BY id DESC
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuserprofile]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuserprofile]
	@userId int 
AS 
BEGIN
	SELECT userId, profileImage, dbo.users.hrmid, dbo.users.name, permanentAddress, city, state, country, emergencyPhone, email, password, phone, role, department, location, joiningDate, reportingManager, reportsTo
	FROM  dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	WHERE dbo.users.id = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuserrequests]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuserrequests]
	@userId int 
AS 
BEGIN
	SELECT dbo.requests.id, dbo.requests.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, email, startDate, endDate, date, leaveType, request, reason, status
	FROM  dbo.requests
	INNER JOIN dbo.profiles
	ON dbo.requests.userId = dbo.profiles.userId
	WHERE dbo.requests.userId = @userId
	ORDER BY dbo.requests.id DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuserskills]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuserskills]
	@userId int 
AS 
BEGIN
	SELECT dbo.users.id, userId, primarySkills, secondarySkills, certifications
	FROM dbo.users
	LEFT JOIN dbo.skills
	ON dbo.skills.userId = dbo.users.id
	where dbo.users.id = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusersubordinates]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusersubordinates] 
   @hrmid nvarchar(255)
AS 
BEGIN
	SELECT dbo.profiles.userId, dbo.users.hrmid, dbo.users.name, role, department, profileImage
	FROM dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	WHERE reportsTo = @hrmid
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusersubordinatesrequests]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusersubordinatesrequests]
	@hrmid nvarchar(255) 
AS 
BEGIN
	SELECT dbo.requests.id, dbo.requests.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, dbo.requests.email, role, request, startDate, endDate, leaveType, reason, status
	FROM  dbo.requests
	INNER JOIN dbo.profiles
	ON dbo.requests.userId = dbo.profiles.userId
	INNER JOIN dbo.users
	ON dbo.requests.userId = dbo.users.id
	WHERE dbo.users.reportsTo = @hrmid
	ORDER BY dbo.requests.id DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusersubordinatestimesheets]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusersubordinatestimesheets]
	@hrmid nvarchar(255) 
AS 
BEGIN
	SELECT dbo.timesheets.id, dbo.timesheets.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, role, timesheetName, clientName, projectName, jobName, workItem, date, week, description, totalTime, billableStatus, submittedHours, approvedHours, status
	FROM  dbo.timesheets
	INNER JOIN dbo.profiles
	ON dbo.timesheets.userId = dbo.profiles.userId
	INNER JOIN dbo.users
	ON dbo.timesheets.userId = dbo.users.id
	WHERE dbo.users.reportsTo = @hrmid
	ORDER BY dbo.timesheets.id DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusersuperiorprofile]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusersuperiorprofile] 
   @hrmid nvarchar(255)
AS 
BEGIN
	SELECT dbo.profiles.userId, dbo.profiles.hrmid, dbo.profiles.name, role, department, profileImage
	FROM  dbo.users
	INNER JOIN dbo.profiles
	ON dbo.users.id = dbo.profiles.userId
	WHERE dbo.users.hrmid = @hrmid
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusertimesheet]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusertimesheet]
	 @userId int , @id int 
AS 
BEGIN
	SELECT * FROM  dbo.timesheets
	WHERE userId = @userId AND id = @id
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getusertimesheets]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getusertimesheets]
	@userId int 
AS 
BEGIN
	SELECT dbo.timesheets.timesheetId, dbo.timesheets.userId, dbo.profiles.profileImage, dbo.profiles.hrmid, dbo.profiles.name, timesheetName, clientName, projectName, jobName, workItem, date, week, description, totalTime, billableStatus, submittedHours, approvedHours, status
	FROM  dbo.timesheets
	INNER JOIN dbo.profiles
	ON dbo.timesheets.userId = dbo.profiles.userId
	WHERE dbo.timesheets.userId = @userId
	ORDER BY dbo.timesheets.id DESC
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_getuserweeklytimesheets]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_getuserweeklytimesheets]
	@userId int, @week nvarchar(255)
AS 
BEGIN
	SELECT userId, timesheetId, timesheetName, clientName, projectName, jobName, workItem, date, week, description, totalTime, billableStatus, submittedHours FROM  dbo.timesheets
	WHERE userId = @userId AND week = @week
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_postusercheckin]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_postusercheckin]
	@userId int, @checkInLocation nvarchar(255), @status nvarchar(255)
AS 
BEGIN
	DECLARE @checkInDate date;
	DECLARE @checkInTime nvarchar(255);
	SET @checkInDate = CAST(CURRENT_TIMESTAMP AS date);
	SET @checkInTime = CONVERT(varchar,GETDATE(),8);
	INSERT INTO dbo.attendances (userId, checkInTime, checkInDate, checkInLocation, status)
	values (@userId, @checkInTime, @checkInDate, @checkInLocation, @status)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_postusernotification]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[sp_users_postusernotification]
	@notificationId nvarchar(255), @content nvarchar(255), @sender nvarchar(255), @receiver nvarchar(255), @date nvarchar(255), @type nvarchar(50)
AS 
BEGIN
	INSERT INTO dbo.notifications (notificationId, content, sender, receiver, date, status, type)
	values (@notificationId, @content, @sender, @receiver, @date, 'unread', @type)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_postuserprofile]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_postuserprofile]
	@userId int, @profileImage nvarchar(MAX), @hrmid nvarchar(255), @name nvarchar(255), @permanentAddress nvarchar(255), @city nvarchar(255), @state nvarchar(255),@country nvarchar(255), @emergencyPhone nvarchar(255)
AS 
BEGIN
	IF NOT EXISTS (SELECT userId from dbo.profiles WHERE userId = @userId)
	INSERT INTO dbo.profiles (userId, profileImage, hrmid, name, permanentAddress , city, state, country, emergencyPhone)
	values (@userId, @profileImage, @hrmid, @name, @permanentAddress ,  @city ,  @state,@country,  @emergencyPhone)
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_postuserrequest]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_postuserrequest]
	@userId int, @email nvarchar(255), @startDate date, @endDate date,@leaveType nvarchar(255), @request nvarchar(255), @reason nvarchar(255)
AS 
BEGIN
	DECLARE @date date;
	SET @date = CAST(CURRENT_TIMESTAMP AS date);
	INSERT INTO dbo.requests(userId, email, startDate, endDate, date, leaveType, request, reason, status)
	values (@userId, @email, @startDate,@endDate, @date, @leaveType, @request, @reason, 'Pending')
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_postuserskills]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_postuserskills]
	@userId int, @primarySkills nvarchar(255), @secondarySkills nvarchar(255),@certifications nvarchar(255)
AS 
BEGIN
	IF NOT EXISTS (SELECT userId FROM dbo.skills WHERE userId = @userId)
	INSERT INTO dbo.skills(userId, primarySkills, secondarySkills, certifications)
	values (@userId, @primarySkills, @secondarySkills, @certifications )
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateallusernotifications]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateallusernotifications]
    @hrmid nvarchar(255)
AS 
BEGIN
	UPDATE dbo.notifications
    SET status = 'read'
    WHERE receiver = @hrmid
    SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateusercheckout]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateusercheckout]
    @userId int, @checkOutLocation nvarchar(255), @status nvarchar(255), @checkInTime nvarchar(255)
AS 
BEGIN
	DECLARE @checkOutDate date;
	DECLARE @checkOutTime nvarchar(255);
	SET @checkOutDate = CAST(CURRENT_TIMESTAMP AS date);
	SET @checkOutTime = CONVERT(varchar,GETDATE(),8);

    UPDATE dbo.attendances
    SET checkOutDate = @checkOutDate, checkOutTime = @checkOutTime, checkOutLocation = @checkOutLocation, status = @status
    WHERE userId = @userId AND checkInDate = @checkOutDate AND checkInTime = @checkInTime
    SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateusernotification]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateusernotification]
    @hrmid nvarchar(255), @notificationId nvarchar(255)
AS 
BEGIN
	UPDATE dbo.notifications
    SET status = 'read'
    WHERE receiver = @hrmid AND notificationId = @notificationId
    SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateuserprofiledetails]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateuserprofiledetails]
	@userId int, @permanentAddress nvarchar(255), @city nvarchar(255) ,@state nvarchar(255),@country nvarchar(255), @emergencyPhone nvarchar(255)
AS 
BEGIN
	UPDATE dbo.profiles
	SET permanentAddress = @permanentAddress, city = @city, state = @state, country = @country,  emergencyPhone = @emergencyPhone
	WHERE profiles.userId = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateuserprofileimage]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateuserprofileimage]
	@userId int, @profileImage nvarchar(MAX)
AS 
BEGIN
	UPDATE dbo.profiles
	SET profileImage = @profileImage
	WHERE profiles.userId = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateuserrequest]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateuserrequest]
     @userId int, @id int, @status nvarchar(255)
AS 
BEGIN
     UPDATE dbo.requests
     SET status = @status
     WHERE userId = @userId AND id = @id
     SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateusersignup]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateusersignup]
	@name nvarchar(255), @email nvarchar(255),@password nvarchar(255)
AS 
BEGIN
	UPDATE dbo.users
	SET name=@name, email=@email, password=@password
	WHERE dbo.users.email = @email
	SET NOCOUNT ON; 
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateuserskills]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateuserskills]
	@userId int, @primarySkills nvarchar(255), @secondarySkills nvarchar(255), @certifications nvarchar(255)
AS 
BEGIN
	UPDATE dbo.skills
	SET primarySkills = @primarySkills, secondarySkills = @secondarySkills, certifications = @certifications
	WHERE userId = @userId
	SET NOCOUNT ON;
END
GO
/****** Object:  StoredProcedure [dbo].[sp_users_updateusertimesheet]    Script Date: 07/13/2023 01:55:54 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_users_updateusertimesheet]
     @id int, @userId int, @approvedHours nvarchar(255), @status nvarchar(255)
AS 
BEGIN
     UPDATE dbo.timesheets
     SET status = @status, approvedHours = @approvedHours
     WHERE id = @id AND userId = @userId
     SET NOCOUNT ON;
END
GO
USE [master]
GO
ALTER DATABASE [ctintern] SET  READ_WRITE 
GO
