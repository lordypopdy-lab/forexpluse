import React from 'react'
import MainNavBar from '../components/MainNavBar'

const Deposite = () => {
    return (
        <>
            <MainNavBar />
            <div style={{ marginTop: "80px" }} className="container-scroller">
                <div className="container-fluid page-body-wrapper">
                    <div className="main-panel m-0 w-100">
                        <div className="content-wrapper">
                            <div className="row">
                                <div style={{ borderRadius: "0px" }} className="col-xl-6 p-2 col-sm-6">
                                    <button className='btn btn-secondary w-100'><i className="fas fa-wallet text-warning m-2"></i>Connect Wallet</button>
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card card-gradient">
                                        <div className="card-body card-gradient">
                                            <h4 className="card-title">Deposit Using Bitcoin | USDT(TRC20)</h4>
                                            <p className="card-description">Bitcoin | USDT Deposit Method</p><hr />
                                            <form className="forms-sample">
                                                <p className="card-description"><span className="text-warning">Please make sure you upload your payment proof for quick payment verification On confirmation,</span> <span className="text-primary">our system will automatically Fund your account and notify you via email address.</span></p>
                                                <div className="form-group">
                                                    <label for="exampleInputConfirmPassword1">[Deposite|Amount]</label>
                                                    <input type="number" className="form-control bg-transparent" placeholder="$0.00" required />
                                                </div>
                                                <div className="mt-3 d-flex justify-content-between">
                                                    <button type="submit" className="btn btn-primary">Deposite</button>
                                                    <button className="btn btn-dark">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-sm-6 grid-margin mt-5">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card card-gradient">
                                        <div className="card-body card-gradient">
                                            <h4 className="card-title">Other Deposit Options</h4><hr />
                                            <p className="card-description">Request other available Deposit Method</p>
                                            <p className="card-description"><span className="text-success">Once requested, you will receive the payment details via our support mail....Once payment</span> is made using this method you are to send your payment proof to our support mail support@hintsprimefx.com</p>
                                            <form action="payments.php" className="forms-sample">
                                                <div className="form-group">
                                                    <label for="exampleInputPassword1">Other Gateway</label>
                                                    <input type="number" className="form-control bg-transparent" placeholder="Other Gateway" />
                                                </div>
                                                <div className="mt-3 d-flex justify-content-between">
                                                    <button type="submit" className="btn btn-primary mr-2">Deposite</button>
                                                    <button className="btn btn-dark">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Deposite
