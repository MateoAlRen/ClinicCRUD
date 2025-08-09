CREATE DATABASE clinic_crud;
USE clinic_crud;

CREATE TABLE administrator (
	administrator_ID INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(250) NOT NULL UNIQUE,
    admin_password TEXT NOT NULL,
    admin_name VARCHAR(200) NOT NULL
);

INSERT INTO administrator (administrator_ID, email, admin_password, admin_name)
VALUES (
	1,
    "admin@clinic.com",
    "Qwe.123*",
    "Mateo Admin"
	);

SELECT * FROM administrator;


CREATE TABLE patient (
	patient_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(200) UNIQUE,
    full_name VARCHAR(200) NOT NULL,
    identification INT NOT NULL
);

CREATE TABLE doctor (
	doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    hospital_email VARCHAR(200) UNIQUE NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    identification INT NOT NULL
);

CREATE TABLE specialization (
	specialization_ID INT AUTO_INCREMENT PRIMARY KEY,
    specialization_name VARCHAR(250) NOT NULL
);

CREATE TABLE payment(
	payment_ID INT AUTO_INCREMENT PRIMARY KEY,
    payment_method VARCHAR(200) NOT NULL
);

CREATE TABLE medical_specialization (
	medical_specialization_id INT AUTO_INCREMENT PRIMARY KEY,
    specialization_id INT,
    doctor_id INT,
    FOREIGN KEY (specialization_id) REFERENCES specialization(specialization_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)
);

CREATE TABLE medical_appointment (
	appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    payment_ID INT,
    appointment_status VARCHAR(200) NOT NULL,
    location VARCHAR(250) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    motive TEXT NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id),
    FOREIGN KEY (payment_ID) REFERENCES payment(payment_ID)
);

CREATE TABLE diagnosis (
	diagnosis_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    appointment_id INT,
    diagnosis TEXT NOT NULL,
    medical_preescription TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id),
    FOREIGN KEY (appointment_id) REFERENCES medical_appointment(appointment_id)
);

SELECT * FROM diagnosis;
SELECT * FROM doctor;
SELECT * FROM medical_appointment;
SELECT * FROM medical_specialization;
SELECT * FROM patient;
SELECT * FROM payment;
SELECT * FROM specialization;



