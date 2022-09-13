import $ from 'jquery'
import { useEffect } from 'react';
/* eslint-disable */

const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
window.Buffer = window.Buffer || require("buffer").Buffer

function App() {

  // Merkle tree integration
  let proof
  const whitelistAddresses = [
    "0x04c63D8c2fc9DD602aeE46F12083af1DdE69C713",
    "0x2caF424F1BcbEf1f1D7dF082c6b5677f0283f9d7",
    "0x17AeCDc3FeD98beAc7629C78849c4444a0a2075b",
    "0x1f9E9d8420387D6B8e74d71468Ae17b693ec537f"
  ]

  const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

  // Get the RootHash
  // const rootHash = merkleTree.getRoot().toString('hex');
  // console.log(rootHash)

  useEffect(() => {
    $('#WLmint_btn').click(() => {
      const claimingAddress = $('#user_address').text()
      for (var i = 0; i < whitelistAddresses.length; i++) {
        if (claimingAddress === whitelistAddresses[i]) {
          const hexProof = merkleTree.getHexProof(leafNodes[i])
          proof = hexProof.toString()
          break
        } else {
          proof = null
        }
      }
      if (proof == null) {
        alert("You are not whitelisted!");
      } else {
        $('#hash_proof').html(proof)
        $('#WLmint_btn').off()
      }
    })
  }, [])

  return (
    <div className="App">
    </div>
  );
}

export default App;
