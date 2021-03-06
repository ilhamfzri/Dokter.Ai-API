const admin = require('firebase-admin');
const serviceAccount = require('../private_key/key.json');

dataFormat = [
    {
        id: "id penyakit (string)",
        nama: "nama penyakit (string)",
        deskripsi: "deskripsi penyakit (string)",
        gambar: "link gambar (string)",
        rekomendasi_1: "(string)",
        rekomendasi_2: "(string)",
        rekomendasi_3: "(string)",
        rekomendasi_4: "(string)",
        rekomendasi_5: "(string)",
        rekomendasi_6: "(string)"
    }
]

if (admin.apps.length === 0) {
    admin.initializeApp({credential: admin.credential.cert(serviceAccount)});
  }
  
const db = admin.firestore();

exports.getDocumentDisease = async (req, res) => {
    const { id } = req.params;
    const diseaseRef = await db.collection('diseases').doc(id);
    const doc = await diseaseRef.get();
    if (!doc.exists) {
        console.log(`No Disease Document ID : ${id}`);
    }
    else {
        console.log('Document Data', doc.data());
        res.send(doc.data());
    }
};

exports.addDocumentDisease = async (req, res) => {
    // console.log(req.body);
    const { id } = req.params;
    console.log(id);
    const docRef = db.collection('diseases').doc(id);
    const diseases_param = req.body;
    const nama = req.body.nama;
    const deskripsi = req.body.deskripsi;
    const gambar = req.body.gambar;
    const rekomendasi_1 = req.body.rekomendasi_1;
    const rekomendasi_2 = req.body.rekomendasi_2;
    const rekomendasi_3 = req.body.rekomendasi_3;
    const rekomendasi_4 = req.body.rekomendasi_4;
    const rekomendasi_5 = req.body.rekomendasi_5;
    const rekomendasi_6 = req.body.rekomendasi_6;

    const diseaseRef = await db.collection('diseases').doc(id);
    const doc = await diseaseRef.get();

    if (doc.exists) {
        res.send('Tidak dapat menambahkan data karena sudah ada, gunakan patch');
    }

    else if (nama == undefined && deskripsi == undefined && rekomendasi_1 == undefined && gambar == undefined,
        rekomendasi_2 == undefined, rekomendasi_3 == undefined, rekomendasi_4 == undefined, rekomendasi_5 == undefined,
        rekomendasi_6 == undefined) {
        console.log('Format Salah!');
        res.send(dataFormat);
    }
    else {
        await docRef.set({
            id: id,
            nama: nama,
            gambar: gambar,
            deskripsi: deskripsi,
            rekomendasi_1: rekomendasi_1,
            rekomendasi_2: rekomendasi_2,
            rekomendasi_3: rekomendasi_3,
            rekomendasi_4: rekomendasi_4,
            rekomendasi_5: rekomendasi_5,
            rekomendasi_6: rekomendasi_6
        });
        res.send(`Penyakit ${nama} sudah ditambahkan ke database!`);
    }
}

exports.updateDocumentDisease = async (req, res) => {
    const { id } = req.params;
    const diseaseRef = await db.collection('diseases').doc(id);
    const doc = await diseaseRef.get();
    if (doc.exists) {
        const { nama, deskripsi, gambar, rekomendasi_1, rekomendasi_2, rekomendasi_3, rekomendasi_4, rekomendasi_5,
            rekomendasi_6 } = req.body;

        if (nama) {
            await diseaseRef.update({ nama: nama });
        }

        if (deskripsi) {
            await diseaseRef.update({ deskripsi: deskripsi });
        }

        if (gambar) {
            await diseaseRef.update({ deskripsi: deskripsi });
        }

        if (rekomendasi_1) {
            await diseaseRef.update({ rekomendasi_1: rekomendasi_1 });
        }
        if (rekomendasi_2) {
            await diseaseRef.update({ rekomendasi_2: rekomendasi_2 });
        }
        if (rekomendasi_3) {
            await diseaseRef.update({ rekomendasi_3: rekomendasi_3 });
        }
        if (rekomendasi_4) {
            await diseaseRef.update({ rekomendasi_4: rekomendasi_4 });
        }
        if (rekomendasi_5) {
            await diseaseRef.update({ rekomendasi_5: rekomendasi_5 });
        }
        if (rekomendasi_6) {
            await diseaseRef.update({ rekomendasi_6: rekomendasi_6 });
        }
        res.send(`Update pada penyakit dengan ID ${id} berhasil!`);
    }
    else {
        res.send(`Data Penyakit dengan ID ${id} tidak terdapat di database!`);
    }
}
