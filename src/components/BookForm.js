import React,  { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const BookForm = (props) => {
    const [book, setBook] = useState({
        bookname: props.book ? props.bookname : '',
        author: props.book ? props.author : '',
        price : props.book ? props.price : '',
        quantity : props.book ? props.quantity : '',
        date: props.book ? props.date : '',
    });

    const [errorMsg, setErrorMsg] = useState('');
    const { bookname, author, price, quantity } = book;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const values = [bookname, author, price, quantity];
        let errorMsg = '';

        const allFieldsFilled = values.every((field) => {
            const value = `${field}`.trim();
            return value !== '' && value !== '0';
        });

        if (allFieldsFilled) {
            const book = {
                id: uuidv4(),
                bookname, 
                author,
                price, 
                quantity,
                date: new Date()
            };
            props.handleOnSubmit(book);
        } else {
            errorMsg = 'Please fill out all fields.';
        } 
        setErrorMsg(errorMsg);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        switch(name) {
            case 'quantity':
                if (value === '' || parseInt(value) === +value) {
                    setBook((prevState) => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            case 'price':
                if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
                    setBook(prevState => ({
                        ...prevState,
                        [name]: value
                    }));
                }
                break;
            default: 
                setBook((prevState) => ({
                    ...prevState,
                    [name]: value
                }));
        }
    };

    return (
        <div className="main-form">
            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
            <Form onSubmit={handleOnSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="bookname"
                        value={bookname}
                        placeholder="Enter name of book"
                        onChange={handleInputChange}
                    />
                </Form.Group> 
                <Form.Group controlId='author'>
                    <Form.Label>Book Author</Form.Label>
                    <Form.Control
                        className="input-control"
                        type="text"
                        name="author"
                        value={author}
                        placeholder='Enter name of author'
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="quantity">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control 
                        className="input-control"
                        type="number"
                        name="quantity"
                        value={quantity}
                        placeholder='Enter available quantity'
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Form.Group controlId="input-control">
                    <Form.Label>Book Price</Form.Label>
                    <Form.Control 
                        className="input-control"
                        type="text"
                        name="price"
                        value={price}
                        placeholder="Enter price of book"
                        onChange={handleInputChange}
                    />
                </Form.Group>
                <Button variant='primary' type='submit' className='submit-btn'>
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default BookForm; 