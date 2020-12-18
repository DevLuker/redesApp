const getData = async () => {
    const res = await fetch("http://0.0.0.0:8080/topology");
    const json = await res.json();
    return json;
}

const main = async () => {

    const json = await getData();
    const hosts = json['hosts'];
    const switches = json['switches'];
   
    pintarSwitches(switches, hosts)
}

const pintarSwitches = (switches, hosts) => {
    let contenido = document.getElementById('contenido');
    let string = '';
    switches.map((e) => {
        string += pintarSwitch(e, hosts);
    }
    );
 
    contenido.innerHTML = string;
}

const pintarSwitch = (sw, hosts) => {
    let hostsDom = pintarHosts(sw.dpid, hosts);

    return `      
        <div class="card col-4 ">
            <img src="switch.jpeg" class="card-img-top" alt="...">
            <div class="card-body">
            ${pintarNombre(sw.dpid)}
                <p>
                ${hostsDom}              
                </p>                
            </div>
        </div>
        
   
    `;
}
const pintarNombre = (name) => {
    return `
    <h5 class="card-title text-danger">
       Switch ${name}
    </h5>
  `
}
const pintarHosts = (dpid, hosts) => {
    const hostsSW = hostsSwitch(dpid, hosts);
    if (hostsSW.length > 0) {
        let string = '';
        hostsSW.map((e) => {
            string += pintarHost(e);
        });
        return string;
    } else { 
        return `
        <div class="card card-body">
            <p>Este Switch no contiene datos</p>
        </div>
        <br>
    `;
    }
}
const pintarHost = (host) => {
    return `
    <div class="card card-body text-primary">
     <img src="host.png" alt="host" width="80">  
        <p>ipv4:${host.ipv4[0]}</p>
        <p>ipv6:${host.ipv6[0]}</p>
        <p>Mac: ${host.mac}</p>
    </div>
    <br>
`;
}

const hostsSwitch = (dpid, hosts) => {
    let hostsConnected = [];
    hosts.map((host) => {
        if (host.port.dpid === dpid) {
            hostsConnected.push(host);
        }
    });
    return hostsConnected;

}

main();



