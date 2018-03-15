var log4js = require( "log4js" );
log4js.configure('./config/log4js.json')
var logger = log4js.getLogger( "logger" );
//logger.level = 'debug';
module.exports = logger;

