const yargs = require("yargs");
const contacts = require("./contacts");

yargs.command({
  command: 'add',
  describe: 'Menambahkan kontak baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    },
    email: {
      describe: 'Alamat email',
      demandOption: false,
      type: 'string'
    },
    noHP: {
      describe: 'Nomor handphone',
      demandOption: true,
      type: 'string'
    }
  },

  handler(argv) {
    contacts.simpanContact(argv.nama, argv.email, argv.noHP);
    // const contact = {
    //    nama: argv.nama,
    //    email: argv.email,
    //    noHP: argv.noHP
    // };
    // console.log(contact);
  }
}).demandCommand();

// menampilkan daftar nama kontak
yargs.command({
  command: 'list',
  describe: 'Menampilkan semua nama & nomor hp',
  handler() {
    contacts.listContact();
  }
});

// menampilkan detail kontak
yargs.command({
  command: 'list',
  describe: 'Menampilkan detail kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },

  handler(argv) {
    contacts.detailContact(argv.nama);
  }
});

// menghapus contact berdasarkan nama
yargs.command({
  command: 'delete',
  describe: 'Menghapus kontak berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string'
    }
  },

  handler(argv) {
    contacts.deleteContact(argv.nama);
  }
});

yargs.parse();

// mengambil argumet dari command line
// console.log(process.argv);
// if (command === 'add') {

// } else if (command === 'remove') {

// } else if (command === 'list') {

// }


// const { writeQuestion, simpanContact } = require('./contacts');
// const contacts = require('./contacts');

// Main App
// const main = async () => {
//    const nama = await contacts.writeQuestion('Masukkan nama anda :');
//    const email = await contacts.writeQuestion('Masukkan email anda :');
//    const noHP = await contacts.writeQuestion('Masukkan No HP anda :');

//    contacts.simpanContact(nama, email, noHP);
// };

// main();

// rl.question('Masukkan nama anda : ', (nama) => {
//    rl.question('Masukkan nomor hp : ', (noHP) => {
//       const contact = { nama, noHP };
//       const file = fs.readFileSync('data/contacts.json', 'utf-8');
//       const contacts = JSON.parse(file);

//       contacts.push(contact);

//       fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
//       console.log('Terimakasih telah menambahkan data.');
//       rl.close();
//    });
// });
