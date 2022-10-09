import React from 'react';
import Layout from '../components/Layout';
import NftListRenderingComponent from '../components/NftListRenderingComponent';
import DfinityAdapter from "../src/chain/adapters/DfinityAdapter";

class Marketplace extends NftListRenderingComponent {

    state = {nfts: ''}

    static async getInitialProps() {
        console.log("In market")
        const isInBroswer = typeof window !== 'undefined';
        let nfts = [];
        if(isInBroswer) {
          const marketplace = (await import('../src/declarations/marketplace')).marketplace;
          console.log(marketplace)
          const chainAdapter = new DfinityAdapter(marketplace);
    
            nfts = await chainAdapter.getListedNfts();
            return {
                nfts: nfts,
                chainAdapter: chainAdapter
            }
        }else{
            console.log("server side");
            return {nfts: nfts};
        }

    }

    render() {
        console.log("Rendering market")
        return (
        <Layout LOCAL_II_CANISTER_ID={process.env.LOCAL_II_CANISTER_ID}>
            {this.renderNftList(false, true)}
        </Layout>
        );
    }
}

export default Marketplace;