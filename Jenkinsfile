pipeline {
    agent any

    tools {
        nodejs 'NodeJS 23.3.0'  // Utilise l'installation Node.js configurée dans Jenkins
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

        
        stage('Run Tests') {
            steps {
                // Change directory to api/tests and run tests
                dir('api/tests') {
                    // Run your test suite using Jest or Mocha (or your preferred testing framework)
                    sh 'npm test'  // Or `yarn test` if you're using Yarn
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
