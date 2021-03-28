const wvs = 1e8 
describe('ERC20', () => {
    before(async() => {
        await setupAccounts({
            token: 0.1 * wvs,
            sender: 0.1 * wvs,
            recipient: 0.1 * wvs
        })
        const compiledDapp = compile(file('erc20.ride'))
        const tokenAddress = address(accounts.token)

        const dAppTx = setScript({script: compiledDapp}, accounts.token)
        await broadcast(dAppTx)
        await waitForTx(dAppTx.id)
        console.log('Scrips were deployed')
    })
      
    it('should correct mint execution', async () => {
        const tx = invokeScript({
            dApp: address(accounts.token),
            call: {
                function: "mint",
                args: [{
                    type: "string",
                    value: address(accounts.sender)
                }, {
                    type: "integer",
                    value: 100 * wvs
                }]
            }
        }, accounts.sender);

        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('should correct burn execution', async () => {
        const tx = invokeScript({
            dApp: address(accounts.token),
            call: {
                function: "burn",
                args: [{
                    type: "string",
                    value: address(accounts.sender)
                }, {
                    type: "integer",
                    value: 10 * wvs
                }]
            }
        }, accounts.sender);

        await broadcast(tx)
        await waitForTx(tx.id)
    })

    it('should correct transfer execution', async () => {
        const tx = invokeScript({
            dApp: address(accounts.token),
            call: {
                function: "transfer",
                args: [{
                    type: "string",
                    value: address(accounts.sender)
                }, {
                    type: "string",
                    value: address(accounts.recipient)
                }, {
                    type: "integer",
                    value: 10 * wvs
                }]
            }
        }, accounts.sender);

        await broadcast(tx)
        await waitForTx(tx.id)
    })
})