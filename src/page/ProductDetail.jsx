// useParans - 현재 경로에서 사용되는 모든 파라메터 들이 저장되어있음

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Dropdown, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import { BsHeartFill, BsHeart, BsHandbag } from "react-icons/bs";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [heartFill, setHeartFill] = useState(false);
  let { id } = useParams();

  const getProductDetail = async () => {
    // let url = `https://my-json-server.typicode.com/hpmp1379/hnm/products/${id}`;
    let url = `http://localhost:5000/products/${id}`;
    let response = await fetch(url); //브라우저는 네트워크에 요청을 보내고 프로미스객체가 반환
    let data = await response.json();
    setProduct(data);
  };

  const likeToggle = () => {
    setHeartFill(!heartFill);
    console.log("heartFill상태는? ", heartFill);
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12} sm={7}>
          <img src={product?.img} alt="" className="detail-img" />
        </Col>
        <Col sm={{ span: 4, offset: 1 }}>
          <div className="detail-titleWrap">
            <div className="detail-title">{product?.title}</div>
            <div className="like" onClick={likeToggle}>
              {heartFill ? <BsHeartFill className="heartFill" /> : <BsHeart />}
            </div>
          </div>
          <div className="detail-price">₩ {product?.price}</div>
          {product?.new === true ? <div className="new">신제품</div> : ""}

          <div>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Dropdown Button
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Button variant="dark">
            <BsHandbag />
            추가
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
