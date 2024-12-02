pipeline {
    agent any

    environment {
        // Variables d'environnement pour les tests, si nécessaire
        NODE_ENV = 'test'
    }

    stages {
        // Etape 1: Checkout du code
        stage('Checkout') {
            steps {
                git 'https://github.com/NajahAitelfatmi/projetUptSady.git'
            }
        }

        // Etape 2: Installer les dépendances et exécuter les tests pour le backend (Node.js)
        stage('Backend Tests') {
            steps {
                dir('api') {
                    script {
                        // Installer les dépendances du backend
                        sh 'npm install'

                        // Exécuter les tests backend
                        sh 'npm test'
                    }
                }
            }
        }

        // Etape 3: Déploiement du backend (optionnel selon votre configuration)
        stage('Deploy Backend') {
            when {
                branch 'v3'
            }
            steps {
                dir('api') {
                    script {
                        // Déployer le backend (exemple avec Heroku, AWS, etc.)
                        sh './deploy.sh'
                    }
                }
            }
        }
    }

    post {
        always {
            // Étapes à exécuter après la fin du pipeline
            echo 'Pipeline terminé.'
        }
        success {
            echo 'Build réussi!'
        }
        failure {
            echo 'Build échoué!'
        }
    }
}
