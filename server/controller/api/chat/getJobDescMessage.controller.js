const settings = require('../../../settings');
var _ = require('lodash');
var Q = require('q');
const chat = require('../../../model/chat');

const logger = require('../../services/logger');

module.exports = function (req,res){
	let userId = req.auth.user._id;
    get_job_desc_msgs(req.body,userId).then(function (err, about)
    {
        if (about)
        {
            res.json(about);
        }
        else
        {
            res.json(err);
        }
    })
        .catch(function (err)
        {
            res.json({error: err});
        });
}

function get_job_desc_msgs(data,senderId){
    var deferred = Q.defer();
    chat.find({
        $and : [
            {
                $and:[{receiver_id:data.receiver_id},{sender_id: senderId}]
            },
            {
                msg_tag:data.msg_tag
            }
        ]
    }, function (err, data)
    {
        if (err){
            logger.error(err.message, {stack: err.stack});
            deferred.reject(err.name + ': ' + err.message);
        }
        else{
            if(data.length > 0) {
                deferred.resolve({
                    datas: data
                });
            }
            else{
                deferred.resolve({
                    datas: 0
                });
            }
        }
    });
    return deferred.promise;
}