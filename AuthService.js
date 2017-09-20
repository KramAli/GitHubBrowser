var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash');
const AuthKey = 'auth';
const UserKey = 'user';


class Authservice{

    getAuthInfo(cb)
    {
        AsyncStorage.multiGet([AuthKey,UserKey], (err, val)=>{

            console.log('trying to get user out')
            if(err){
             return cb(err);
            }
            
            if(!val){
                return cb();
            }

            var zippedObj = _.fromPairs(val);

            console.log(val)

            if(!zippedObj[AuthKey]){
                console.log('we got no user logged in')
                return cb();
            }

            var authInfo = {
                header: {
                    Authorization: 'Basic ' + zippedObj[AuthKey]
                },
                user: zippedObj[AuthKey]
            }
            //console.log('AuthInfo: ' + authInfo.user)
            return cb(null,authInfo);
        });
    }
    login(creds, cb){

        var credentails = new buffer.Buffer(creds.username + 
			':' + creds.password);

		var encodedCredentials = credentails.toString('base64');

		fetch('https://api.github.com/user', {
			headers: {
						'Authorization' : 'Basic ' + encodedCredentials
			}
		})
		.then((response)=>{
			if(response.status >= 200 && response.status < 300){
				return response;
			}
			//console.log(response.status);
			if(response.status==401)
			{
                console.log('Error: 401')
                return cb({success:false, badCredentials:true});
            }
            console.log('Error: Unknown')
            return cb({success:false, unknownError:true});
		})
		.then((response)=>{
			return response.json();
		})
		.then((results)=>{
            AsyncStorage.multiSet([
                    ['auth',encodedCredentials],
                    ['user',JSON.stringify(results)]
                ],(err)=>{
                if(err){
                    console.log('got a problem storing the user')
                    throw err;
                }
                console.log('storing user no problemo')
            })
            console.log('Successfully logged in');
 
            return cb({success:true})
		})
		.catch((err)=> {
			return cb((err));
		})
		.finally(()=>{
    
		});

    }

}

module.exports = new Authservice();