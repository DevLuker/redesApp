var cantS = document.querySelector('#cantS')
var cantH = document.querySelector('#cantH')


const getData = async () => {
    const res = await fetch("http://0.0.0.0:8080/topology");
    const json = await res.json();
    return json;
}

const main = async () => {
    const json = await getData();
    const hosts = json['hosts'];
    const switches = json['switches'];

    
    cantS.innerHTML = switches.length;
    cantH.innerHTML = hosts.length;

    getSwitch(switches);
    getHost(hosts);

}


const getSwitch = (switches) => {
    var dataSwitch = document.getElementById("dataSwitch");
    var swith = "";  

    switches.map((s) => {
        swith = swith + `
        <div class="card col-4 mt-3 text-center">   
        <img src="switch.jpeg" class="card-img-top" alt="switch">     
            <h4 class="card-text text-danger">Switch ID: <span class="text-primary">${s.dpid}</span></h4>
        </div>  
        `       
    })
    

    dataSwitch.innerHTML = swith;
}

const getHost = (hosts) => {
    var dataHost = document.getElementById("dataHost");
    var host = ""; 
    hosts.map((h) => {      
        host = host + `        
        <div class="card col-4 mt-3 text-center">   
              <img src="host.png" class="card-img-top" alt="switch">     
              <h4 class="card-text text-danger">MAC:<span class="text-primary">${h.mac}</span></h4>
              <h4 class="card-text text-danger">IPV4:<span class="text-primary">${h.ipv4[0]}</span></h4>
              <h4 class="card-text text-danger">IPV6:<span class="text-primary">${h.ipv6[0]}</span></h4>
              <h4 class="card-text text-danger">ENLACE:<span class="text-primary">${h.port.dpid}</span></h4>
        </div>        
        `       
                 
    });

    dataHost.innerHTML = host;
}


main();



