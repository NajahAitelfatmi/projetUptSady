pipeline {
    agent any

    tools {
        nodejs 'nodejs'  // Utilise l'installation Node.js configurée dans Jenkins
    }

    stages {
        

        // Étape pour installer les dépendances avec npm
        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'  // Installe les dépendances
                }
            }
        }

        // Étape pour construire le projet React
        stage('Build React') {
            steps {
                script {
                    sh 'npm run build'  // Compile le projet React
                }
            }
        }

        // Étape pour tester le projet Node.js
        stage('Test') {
            steps {
                script {
                    sh 'npm test'  // Exécute les tests définis dans votre projet Node.js
                }
            }
        }

        // Étape pour déployer (par exemple, sur un serveur)
        stage('Deploy') {
            steps {
                script {
                    // Ajouter ici vos étapes de déploiement
                    sh 'echo "Déploiement réussi !"'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline terminé !'
        }
        success {
            echo 'Le build a réussi !'
        }
        failure {
            echo 'Le build a échoué.'
        }
    }
}
