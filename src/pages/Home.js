import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { NavbarComponent, ResultComponent, CategoryComponent, ProductComponent } from '../components/index';
import { API_URL } from '../utils/constants';

import axios from 'axios';
import swal from 'sweetalert';

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      categorySelected: 'Makanan',
      keranjangs: [],
    }
  }
  componentDidMount() {
    axios.get(API_URL + "products?category.nama=" + this.state.categorySelected)
      .then(res => {
        console.log("response", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })

    this.getListCart();
  }

  // componentDidUpdate(prevState){
  //   if(this.state.keranjangs !== prevState.keranjangs) {
  //     axios.get(API_URL + "keranjangs")
  //     .then(res => {
  //       const keranjangs = res.data;
  //       this.setState({ keranjangs });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   }
  // }
  getListCart = () => {
    axios.get(API_URL + "keranjangs")
      .then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch(err => {
        console.log(err);
      })
  }

  changeCategory = (value) => {
    this.setState({
      categorySelected: value,
      menus: []
    })

    axios.get(API_URL + "products?category.nama=" + value)
      .then(res => {
        console.log("response", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(err => {
        console.log(err);
      })
  }

  addCarts = (value) => {
    axios.get(API_URL + "keranjangs?product.id=" + value.id)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            qty: 1,
            total_harga: value.harga,
            product: value
          }

          axios
            .post(API_URL + "keranjangs", keranjang)
            .then(res => {
              this.getListCart();
              swal("Berhasil", keranjang.product.nama + " masuk keranjang ", "success");
            })
            .catch(err => {
              console.log(err);
            })
        }
        else {
          const keranjang = {
            qty: res.data[0].qty + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }
          axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then(res => {
              this.getListCart();
              swal("Berhasil", keranjang.product.nama + " masuk keranjang ", "success");
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    // console.log(this.state.menus);
    const { menus, categorySelected, keranjangs } = this.state;
    return (
        <div className="mt-3">
          <Container fluid>
            <Row>
              <CategoryComponent changeCategory={this.changeCategory} categorySelected={categorySelected} />
              <Col className="mt-2 mb-2">
                <h5>Daftar Produk</h5>
                <hr />
                <Row>
                  {/* menu dan jika menu ada */}
                  {menus && menus.map((menu) => (
                    <ProductComponent
                      key={menu.id}
                      menu={menu}
                      addCarts={this.addCarts}
                    />
                  ))}
                </Row>
              </Col>
              <ResultComponent keranjangs = {keranjangs} {...this.props} getListCart={this.getListCart} />
            </Row>
          </Container>
        </div>
    )
  }
}
export default Home;
