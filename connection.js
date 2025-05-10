var mySql = require('mysql'),
    config= require('./dbConfig');
    const { Client } = require('ssh2');

    var connection = module.exports = function(){};

    createDBConnection = function(){
        var mySqlConnection = mySql.createDBConnection({
            host:config.mySQLConfig.host,
            user:config.mySQLConfig.user,
            password:config.mySQLConfig.password,
            database:config.mySQLConfig.database,
            connectTimeout:config.mySQLConfig.timeout,
        });

        return mySqlConnection;
    }


    connection.invokeQuery = function(sqlQuery,data){
        var ssh = new Client();
        ssh.connect(config.sshTunnelConfig);

        ssh.on('ready',function(){
            ssh.forwardOut(
                config.localhost,
                config.mySQLConfig.port,
                config.localhost,
                config.mySQLConfig.port,
                function(err,stream){
                    if(err) console.log(err);

                    config.mySQLConfig.stream = stream;

                    var db = mySql.createConnection(config.mySQLConfig);

                    db.query(sqlQuery,function(err,rows){
                        if(rows){
                            console.log(rows);
                            data(rows);
                        }

                        if(err) { console.log(err)}
                    })
                }
            );

        });
    };