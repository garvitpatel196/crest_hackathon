var express = require('express');
var router = express.Router();
var Ansible = require('node-ansible');
var playbook = new Ansible.Playbook().playbook('test');
router.post('/', function (req, res) {
    //playbook.on('stdout', function(data) { console.log(data.toString());});
    var promise = playbook.exec();
    promise.then(function(successResult) {
        //console.log(JSON.parse(successResult.output).plays[0].tasks[0].hosts.localhost.stdout); // Standard output/error of the executed command
        var output = JSON.parse(successResult.output);
        var responseString = [];
        Object.keys(output.plays).forEach(function(key,index){
            Object.keys(output.plays[index].tasks).forEach(function(key1,index1){
                var val = output.plays[index].tasks[index1].hosts.localhost.stdout;
                responseString.push({ "stdout" : val});
                //console.log(responseString);
            });
        });
        res.send(responseString);
        res.end;
    }, function(error) {
        console.error(error);
    });
});

module.exports = router;
