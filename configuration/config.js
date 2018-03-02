module.exports = {

        'facebook' :  { 
                          'appId'         : '107872063053181',
                          'appSecret'     : '042fe163ce277725dd67ea939607195f',
                          'callbackUrl'   : 'http://localhost:8080/login/facebook/return'
                      },
        'google'   :  {
                          'appId'           :   '447353036026-jge0b8g8be9j49n6j61qdkqjqvhj87sc.apps.googleusercontent.com',
                          'appSecret'       :   '7mMhvDwDKL44tkkYwzNpq6KD',
                          'callbackUrl'     :   'http://localhost:8080/login/google/return'
                      },
        'da'       :  {
                           'remote' : 'http://54.187.12.129:3000/',
                           'local'  : 'http://localhost:3000/',
                           'host'   : 'http://localhost:3000/' 
                      }
}