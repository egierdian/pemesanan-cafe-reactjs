import React, { Component } from 'react';
import { Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese } from '@fortawesome/free-solid-svg-icons';

const Icon = ({ nama }) => {
    if (nama === "Makanan") {
        return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    } else if (nama === "Minuman") {
        return <FontAwesomeIcon icon={faCoffee} />
    } else if (nama === "Cemilan") {
        return <FontAwesomeIcon icon={faCheese} className="mr-2" />
    }
}

class CategoryComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
        }
    }

    componentDidMount() {
        axios.get(API_URL + "categories")
            .then(res => {
                console.log("response", res);
                const categories = res.data;
                this.setState({ categories });
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { categories } = this.state
        const { changeCategory, categorySelected } = this.props
        return (
            <Col md={2} className="mt-2 mb-4">
                <h5>Kategori</h5>
                <hr />
                <ListGroup defaultActiveKey="#link1">
                    {categories && categories.map((category) => (
                        <ListGroup.Item 
                            key={category.id} 
                            onClick={() => changeCategory(category.nama)} 
                            className={categorySelected === category.nama && "category-active"}
                            style={{cursor: 'pointer'}}>
                            <Icon nama={category.nama} />{category.nama}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Col>
        );
    }
}

export default CategoryComponent;