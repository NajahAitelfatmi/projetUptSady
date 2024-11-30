import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});


app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validation des champs requis
  if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
      const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // Utilise TLS
          auth: {
              user: 'dinaelhyate@gmail.com', // Votre adresse Gmail
              pass: 'fvlrnrdnfcffopyy', // Mot de passe d'application
          },
          tls: {
              rejectUnauthorized: false, // Permet les certificats auto-signés
          },
      });

      // Utiliser l'email fourni dans le formulaire pour le destinataire
      await transporter.sendMail({
          from: `"${name}" <${email}>`, // Expéditeur
          to: 'dinaelhyate@gmail.com', // Destinataire (utilisé depuis l'input)
          subject: subject, // Sujet
          text: message, // Message
      });

      res.status(200).json({ message: 'Message envoyé avec succès.' });
  } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      res.status(500).json({ error: 'Erreur lors de l\'envoi du message.' });
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Server is running on port 8800!");
});
