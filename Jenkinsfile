pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                // Récupérer le code source depuis GitHub
                git branch: 'main', url: 'https://github.com/NajahAitelfatmi/projetUptSady.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                // Installer les dépendances du projet (npm install pour Node.js/React)
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                // Exécuter les tests
                sh 'npm test'
            }
        }
        stage('Publish Test Results') {
            steps {
                // Publier les résultats des tests (si vous générez des rapports de test JUnit, sinon cette étape peut être ignorée)
                junit 'test-results/*.xml' // Remplacez par le chemin des rapports XML si vos tests en génèrent
            }
        }
    }
}
