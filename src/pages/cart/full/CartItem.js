import React from 'react';
import styles from "./../Cart.module.scss";
import {numberWithCommas} from "../../../common/CommonFunctions";
import {useDispatch, useSelector} from "react-redux";
import {decreaseCount, deleteFromCart, increaseCount} from "../../../redux/cart/CartAction";
import QuantitySelector from "./QuantitySelector";
import {useNavigate} from "react-router-dom";
import { MdDelete, MdEventAvailable, MdVerifiedUser } from 'react-icons/md';

const CartItem = ({item}) => {

    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cart.cartList);

    const history = useNavigate();

    const handlePlus = () => {
        dispatch(increaseCount(item.id));
    };

    const handleMinus = () => {
        dispatch(decreaseCount(item.id));
    };

    const handleDelete = () => {
        dispatch(deleteFromCart(item.id));
    };

    const goToProduct = () => {
        history.push(`/product/${item.id}`);
    };

    return (
        <div className={`p-3 d-flex flex-row ${styles.cartItem}`}>
            <div className="px-4">
                <img src={item.img} style={{cursor: 'pointer'}} onClick={goToProduct}/>
            </div>
            <div className="px-4 flex-fill">
                <p className={styles.title}>{item.name}</p>
                <div className="d-flex">
                    <MdVerifiedUser className={styles.guaranteeLogo}/>
                    <p>گارانتی اصالت و سلامت فیزیکی کالا</p>
                </div>
                <div className="d-flex">
                    <MdEventAvailable className={styles.statusLogo}/>
                    <p>موجود در انبار آنلاین شاپ</p>
                </div>
                <div className="d-flex align-items-center">
                    <QuantitySelector
                        onDecrease={handleMinus}
                        onIncrease={handlePlus}
                        count={cartList.filter(c => c.id === item.id)[0].count}
                    />
                    <div className={styles.deleteBox} onClick={handleDelete}>
                        <MdDelete/>
                        <span>حذف</span>
                    </div>
                    <div className={styles.priceBox}>
                        <span>{numberWithCommas(cartList.filter(c => c.id === item.id)[0].count * item.price)}</span>
                        <span className="mx-1">تومان</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;