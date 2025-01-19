import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar';
import Widget101 from '../../components/Widget101';
import Widget102 from '../../components/Widget102';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import axios from 'axios'
import toast from "react-hot-toast"

const Admin = () => {

    if (!localStorage.getItem("admin")) {
        location.href = "/admin/login";
    }

    var [tInvestors, setTInvestors] = useState(0);
    const [balance, setBalance] = useState(0);
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [message, setMessage] = useState("");
    const [adder, setAdder] = useState({ id: "", value: "", type: "" });
    const [isLoading, setLoading] = useState(false);
    const [isLoading1, setLoading1] = useState(false);
    const [bankR, setBankR] = useState([]);
    const [cryptoR, setCryptoR] = useState([]);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);

    useEffect(() => {
        const Admin = JSON.parse(localStorage.getItem("admin"));
        const email = Admin.email;

        const getCryptoRecords = async () => {
            await axios.post("/AdminGetCrypto", { email }).then((data) => {
                if (data) {
                    setCryptoR(data.data);
                }
            })
        }
        const getBankRecords = async () => {
            await axios.post("/AdminGetBankR", { email }).then((data) => {
                if (data) {
                    setBankR(data.data);
                }
            })
        }
        const getUsers = async () => {
            try {
                await axios.get('/getUsers').then((data) => {
                    if (data.data.length > 0) {
                        setUsers(data.data);
                    }
                })
            } catch (error) {
                console.log(`Error Getting Users: `, error);
            }
        }
        function simulateNetworkRequest() {
            return new Promise(resolve => {
                setTimeout(resolve, 2000);
            });
        }
        if (isLoading) {
            simulateNetworkRequest().then(() => {
                setLoading(false);
            });
        }
        getUsers();
        getBankRecords();
        getCryptoRecords();
    }, [isLoading]);

    const addBalance = async () => {
        { !isLoading1 ? setLoading1(true) : null }
        const { id, value, type } = adder;

        try {
            await axios.post('/addBalance', {
                id,
                value,
                type
            }).then((data) => {
                if (data.data.error) {
                    toast.error(data.data.error);
                    setLoading1(false)
                } else if (data.data.success) {
                    toast.success(data.data.success)
                    console.log(data.data.success);
                    setLoading1(false)
                    setAdder({
                        id: "",
                        value: "",
                        type: ""
                    })
                }
            })
        } catch (error) {
            console.log("Error Adding Balance: ", error);
        }
    }

    const handleClick = () => setLoading(true);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible((prev) => !prev);
    };

    const handleSend = async () => {
        alert("Message Sent!");
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const handleCopy = async (textToCopy) => {
        try {
            await navigator.clipboard.writeText(textToCopy);
            toast.success("Copied successfully!");
        } catch (err) {
            toast.error("Failed to copy!")
        }
    };

    return (
        <div>
            <NavBar />
            <div style={{ marginTop: "80px" }} className="container-scroller">
                <Widget102 />
                <Modal className='mt-4' show={show} onHide={handleClose}>
                    <Modal.Header className='bg-dark' closeButton>
                        <Modal.Title className='card-gradient'>Adding Bonus</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark'>
                        <Form className='card-gradient'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className='bg-dark'>#ID</InputGroup.Text>
                                    <Form.Control
                                        value={adder.id}
                                        onChange={(e) => setAdder({ ...adder, id: e.target.value })}
                                        type='text'
                                        className='bg-dark'
                                        aria-label="Amount (to the nearest dollar)"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <InputGroup className="mb-3">
                                    <InputGroup.Text className='bg-dark'>$</InputGroup.Text>
                                    <Form.Control
                                        type='number'
                                        value={adder.value}
                                        onChange={(e) => setAdder({ ...adder, value: e.target.value })}
                                        className='bg-dark'
                                        aria-label="Amount (to the nearest dollar)"
                                    />
                                    <InputGroup.Text className='card-gradient'>.00</InputGroup.Text>
                                </InputGroup>
                            </Form.Group>
                            <Form.Select value={adder.type} onChange={(e) => setAdder({ ...adder, type: e.target.value })} className='bg-dark' aria-label="Default select example">
                                <option>Open this select menu</option>
                                <option value="bonuse">Add bonus</option>
                                <option value="profit">Add Profit</option>
                                <option value="deposit">Add Deposite</option>
                            </Form.Select>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer className='bg-dark d-flex justify-content-between'>
                        <Button style={{ padding: "8px", width: "120px" }} variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button
                            onClick={addBalance} s
                            tyle={{ padding: "1px", width: "160px" }}
                            variant="primary">
                            {isLoading1 ? "Saving..." : "Save Changes"}
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal className='mt-4' show={show1} onHide={handleClose1}>
                    <Modal.Header className='bg-dark' closeButton>
                        <Modal.Title className='card-gradient'>List of Users</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark'>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>[#]</th>
                                    <th>[<i className='fas text-success fa-paper-plane'></i>]</th>
                                    <th>[Country]</th>
                                    <th>[Account]</th>
                                    <th>[Profit]</th>
                                    <th>[Bonus]</th>
                                    <th>[Deposit]</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td onClick={() => handleCopy(user._id)}><i style={{ cursor: "pointer" }} className='fas fa-copy'></i>{user._id.slice(1, 5)}..</td>
                                            <td>
                                                <Button
                                                    variant="primary"
                                                    style={{ height: "auto", padding: "4px", fontSize: "14px", width: "70px" }}
                                                    disabled={isLoading}
                                                    onClick={!isLoading ? handleClick : null}
                                                >
                                                    {isLoading ? "Loading…" : "Send"}
                                                </Button>
                                            </td>
                                            <td>{user.country}</td>
                                            <td>{user.account}</td>
                                            <td>{user.currency}{user.profit.toFixed(2)}</td>
                                            <td>{user.currency}{user.bonuse.toFixed(2)}</td>
                                            <td>{user.currency}{user.deposit.toFixed(2)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>No users available</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer className='bg-dark d-flex justify-content-between'>
                        <Button variant="secondary" style={{ padding: "8px", width: "120px" }} onClick={handleClose1}>
                            Close
                        </Button>
                        <Button variant="primary" style={{ padding: "8px", width: "160px" }} onClick={handleClose1}>
                            Done
                            <i className='fas text-light m-1 fa-check'></i>
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal className='mt-4' show={show2} onHide={handleClose2}>
                    <Modal.Header className='bg-dark' closeButton>
                        <Modal.Title className='card-gradient'>List of Investors</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark modal-body-scroll'>
                        <Table responsive="xl">
                            <thead>
                                <tr>
                                    <th>[#]</th>
                                    <th>[Name]</th>
                                    <th>[Country]</th>
                                    <th>[Account]</th>
                                    <th>[Profit]</th>
                                    <th>[Bonus]</th>
                                    <th>[Deposit]</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Rita pedro</td>
                                    <td>Brazil</td>
                                    <td>Forex</td>
                                    <td>$230.90</td>
                                    <td>$8977.45</td>
                                    <td>$78826.51</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer className='bg-dark d-flex justify-content-between'>
                        <Button style={{ padding: "8px", width: "120px" }} variant="secondary" onClick={handleClose2}>
                            Close
                        </Button>
                        <Button style={{ padding: "8px", width: "160px" }} variant="primary" onClick={handleClose2}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <div className="container-fluid page-body-wrapper">
                    <div className="main-panel m-0 w-100">
                        <div className="content-wrapper">
                            <div className="row">
                                <div style={{ borderRadius: "0px" }} className="col-xl-6 p-2 col-sm-6">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card card-gradient">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-10">
                                                    <h3 className="text-muted font-weight-normal">Market Cap</h3>
                                                    <div style={{ paddingBottom: "17px" }} className="d-flex mt-2 align-items-center align-self-start">
                                                        <h5 className="display-4 ls-3 text-center">Bal: {isBalanceVisible ? <><span className="text-600">$</span>{balance.toFixed(2)}</> : "******"}</h5>
                                                        <span
                                                            onClick={toggleBalanceVisibility}
                                                            style={{
                                                                background: "none",
                                                                border: "none",
                                                                cursor: "pointer",
                                                                marginLeft: "12px"
                                                            }}
                                                            aria-label={isBalanceVisible ? "Hide Balance" : "Show Balance"}
                                                        >
                                                            <FontAwesomeIcon icon={isBalanceVisible ? faEyeSlash : faEye} />
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col-2">
                                                    <div className="icon icon-box-warning ">
                                                        <span className="fas fa-arrow-top icon-item"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-sm-6 grid-margin mt-3">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card card-gradient">
                                        <div className="card-body">
                                            <div className="row">
                                                <div style={{ marginBottom: "-50px" }} className="col-6 p-3">
                                                    <h6 className="text-muted font-weight-normal">value Added</h6>
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h5 style={{ fontSize: "24px" }} className="display-4 ls-3 text-center">{isBalanceVisible ? <><span className="text-600">$</span>{balance.toFixed(2)}</> : "******"}</h5>
                                                        <p className="text-warning ml-2 mb-0 font-weight-medium">+18%</p>
                                                    </div>
                                                </div>
                                                <div style={{ marginBottom: "-50px" }} className="col-6 p-3">
                                                    <h6 className="text-muted font-weight-normal">value Added</h6>
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h5 style={{ fontSize: "24px" }} className="display-4 ls-3 text-center">{isBalanceVisible ? <><span className="text-600">$</span>{balance.toFixed(2)}</> : "******"}</h5>
                                                        <p className="text-warning ml-2 mb-0 font-weight-medium">+18%</p>
                                                    </div>
                                                    <button onClick={handleShow} style={{ height: "40px", fontSize: "12px", position: "absolute", top: "45%" }} className="btn p-2 btn-gray mt-4">Balance Adder<span className="fas m-1 fa-plus"></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Widget101 />
                            </div>
                            <div className="row">
                                <div className="col-md-12 grid-margin mt-3">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card card-gradient">
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <div className="col">
                                                    <h6 className="card-title">Total Users</h6>
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h5 style={{ fontSize: "19px" }} className="display-4 ls-3 text-center">{isBalanceVisible ? <>{users.length >= 1 ? users.length : "loading..."}</> : "******"}</h5>
                                                        <p className="text-warning ml-2 mb-0 font-weight-small">+28%</p>
                                                    </div>
                                                    <button onClick={handleShow1} style={{ height: "40px", fontSize: "12px" }} className="btn p-2 btn-gray ">View | Users<span className="fas m-1 fa-arrow-down"></span></button>
                                                </div>
                                                <div className="col">
                                                    <h6 className="card-title">Total Investors</h6>
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h5 style={{ fontSize: "19px" }} className="display-4 ls-3 text-center">{isBalanceVisible ? <>{bankR.length >= 1 ? bankR.length + cryptoR.length : 0}</> : "******"}</h5>
                                                        <p className="text-warning ml-2 mb-0 font-weight-medium">+68%</p>
                                                    </div>
                                                    <button onClick={handleShow2} style={{ height: "40px", fontSize: "12px" }} className="btn p-2 btn-warning">[Investors]<span className="fas m-1 fa-arrow-down"></span></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin mt-2 p-2">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card p-2 card-gradient">
                                        <div className="modal-body-scroll">
                                            <h3 className="card-title text-center">Users | Bank | Withdrawal | Table</h3><hr />
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>[#]</th>
                                                        <th>[Amount]</th>
                                                        <th>[Bank]</th>
                                                        <th>[Name]</th>
                                                        <th>[Swift-code]</th>
                                                        <th>[Status]</th>
                                                        <th>[Email]</th>
                                                        <th>[Approve]</th>
                                                        <th>[Decline]</th>
                                                        <th>[Delete]</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bankR.length >= 1 ? (
                                                        bankR.map((data) => (
                                                            <tr>
                                                                <td>ID:{data._id.slice(1, 12)}</td>
                                                                <td>${data.amount}</td>
                                                                <td>{data.bank}</td>
                                                                <td>{data.name}</td>
                                                                <td>{data.swiftCode}</td>
                                                                <td>{data.status}</td>
                                                                <td>{data.email}</td>
                                                                <td><Button style={{ fontSize: "14px" }} variant="warning p-2 m-1">Decline</Button></td>
                                                                <td> <Button style={{ fontSize: "14px" }} variant="success p-2 m-1">Approve</Button></td>
                                                                <td><Button style={{ fontSize: "14px" }} variant="danger p-2 m-1">Delete</Button></td>
                                                                <td></td>
                                                            </tr>
                                                        ))
                                                    ) :
                                                        <tr>
                                                            <td colSpan="10"  className='text-center'>No Records Available!</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 grid-margin mt-2 p-2">
                                    <div style={{ border: "none", borderRadius: "9px" }} className="card p-2 card-gradient">
                                        <div className="modal-body-scroll">
                                            <h3 className="card-title text-center">Users | Crypto | Withdrawal | Table</h3><hr />
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>[#]</th>
                                                        <th>[Amount]</th>
                                                        <th>[Wallet]</th>
                                                        <th>[Status]</th>
                                                        <th>[Email]</th>
                                                        <th>[Approve]</th>
                                                        <th>[Decline]</th>
                                                        <th>[Delete]</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cryptoR.length >= 1 ? (
                                                        cryptoR.map((data) => (
                                                            <tr>
                                                                <td>ID:{data._id.slice(1, 12)}</td>
                                                                <td>${data.amount}</td>
                                                                <td>{data.cryptoAddress}</td>
                                                                <td>{data.status}</td>
                                                                <td>{data.email}</td>
                                                                <td><Button style={{ fontSize: "14px" }} variant="warning p-2 m-1">Decline</Button></td>
                                                                <td> <Button style={{ fontSize: "14px" }} variant="success p-2 m-1">Approve</Button></td>
                                                                <td><Button style={{ fontSize: "14px" }} variant="danger p-2 m-1">Delete</Button></td>
                                                                <td></td>
                                                            </tr>
                                                        ))
                                                    ) :
                                                        <tr>
                                                            <td colSpan="8"  className='text-center'>No Records Available!</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin
