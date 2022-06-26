// File System
const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// // Readline
// const readline = require('readline');

// const rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
// });

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath);
};

// membuat file contacts.json jika belum ada
const filePath = './data/contacts.json';
if (!fs.existsSync(filePath)) {
	fs.writeFileSync(filePath, '[]', 'utf-8');
};

// const writeQuestion = (pertanyaan) => {
//    return new Promise((resolve, reject) => {
//       rl.question(pertanyaan, (nama) => {
//          resolve(nama);
//       });
//    });
// };

// const q2 = () => {
//    return new Promise((resolve, reject) => {
//       rl.question('Masukkan email anda : ', (email) => {
//          resolve(email);
//       });
//    });
// };
const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf-8');
	const contacts = JSON.parse(file);
	return contacts;
}

const simpanContact = (nama, email, noHP) => {
	const contact = { nama, email, noHP };
	const contacts = loadContact();

	// cek duplikasi
	const duplikat = contacts.find((contact) => contact.nama === nama);
	if (duplikat) {
		console.log(chalk.red.inverse.bold('Contact sudah terdaftar, gunakan nama lain!'));
		return false;
	}

	// cek email
	if (email) {
		if (!validator.isEmail(email)) {
			console.log(chalk.red.inverse.bold('Email tidak valid!'));
			return false;
		}
	}

	// cek email
	if (noHP) {
		if (!validator.isMobilePhone(noHP, 'id-ID')) {
			console.log(chalk.red.inverse.bold('Nomor hp tidak valid!'));
			return false;
		}
	}

	contacts.push(contact);

	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
	console.log(chalk.green.inverse.bold('Terimakasih telah menambahkan data.'));
}

const listContact = () => {
	const contacts = loadContact();
	console.log(chalk.cyan.inverse.bold('Daftar contact : '));
	contacts.forEach((contact, i) => {
		console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
	});
};

const detailContact = (nama) => {
	const contacts = loadContact();

	const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());

	if (!contact) {
		console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan!`));
		return false;
	}
};

module.exports = { simpanContact, listContact, detailContact }
