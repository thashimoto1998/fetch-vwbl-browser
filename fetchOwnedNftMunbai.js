async function main() {
    const web3 = new Web3(window.ethereum);
    const viewer = new VWBL.VWBLViewer({
        web3,
        vwblNetworkUrl: 'https://dev.vwbl.network',
        dataCollectorAddress: '0x70Fb88205D1163D276458E5D12D1fcC995BcB252'
    });
    const userAddress = (await web3.eth.getAccounts())[0];
    const ownedItems = await viewer.listOwnedNFTMetadata(userAddress);
    const sortedOwnedItems = ownedItems.filter((v) => v).reverse();
    console.log('owned nfts:', sortedOwnedItems);
    for (const v of sortedOwnedItems) {
        const div = document.createElement('div');
        div.className = "card";
        
        const image = document.createElement('img');
        const res = await fetch(v.image);
        const blob = await res.blob();
        image.src = URL.createObjectURL(blob);
        image.alt = v.name;
        image.width = 300;
        image.height = 200;
        div.appendChild(image);
       
        const pg1 = document.createElement('p');
        const name = document.createTextNode(v.name);
        pg1.appendChild(name);
        div.appendChild(pg1);
        
        const pg2 = document.createElement('p');
        const description = document.createTextNode(v.description);
        pg2.appendChild(description); 
        div.appendChild(pg2);
      
        const div2 = document.createElement('div');
        div2.style.textAlign = "center";
        const btn = document.createElement("button");
        btn.innerHTML = "View asset";
        btn.addEventListener("click", function() {
          location.href = `https://vwbl-mint-app.bubbleapps.io/asset?tokenId=${v.id}&address=${v.address}`;
        });
        btn.className = 'assetBtn';
        div2.appendChild(btn);
        div.appendChild(div2);
      
        document.getElementById('imageList').appendChild(div);
    };
    console.log('get imageList element',  document.getElementById('imageList'));
}

main();
