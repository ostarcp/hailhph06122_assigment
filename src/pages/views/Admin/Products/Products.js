import Paginate from 'components/Main/Paginate/Paginate';
import React, { useEffect, useState } from 'react';
import { BsDownload } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button, Spinner, Table } from 'reactstrap';
import { getAllCategory } from 'redux/actions/categoryActions';
import {
  addProduct, deleteProduct,
  editProduct, getAllProduct,
  searchPD
} from 'redux/actions/productActions';
import getCateList from 'redux/selector/getCategory';
import Swal from 'sweetalert2';
import SearchBox from './components/SearchBox';
import ProductModal from './dialog/ProductModal';
import Product from './Product';


const Products = (props) => {
  const dispatch = useDispatch(getAllProduct());
  const productReducer = useSelector(state => state.productReducer);

  const cateList = getCateList();
  const { productsList, filterProduct, isGettingPD, isDeleting, isUpdating, isAdding, error } = productReducer;

  const [editModal, setopenEditModal] = useState(false);
  const [addModal, setopenAddModal] = useState(false);

  const [query, setquery] = useState('');
  const [singleFood, setsingleFood] = useState({});

  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  const paginate = (pageNumber) => setcurrentPage(pageNumber);


  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllProduct());
  }, [])


  const toggleEditModal = (food) => {
    setsingleFood({ ...food });
    setopenEditModal(!editModal);
  }

  const toggleAddModal = () => {
    console.log('click add');
    setopenAddModal(!addModal);
  }

  const onAddProduct = (food) => {
    console.log('adding');
    dispatch(addProduct({ food }))
    setopenAddModal(!addModal);
  }

  const onEditProduct = (food) => {
    console.log('edit');
    dispatch(editProduct({ food }));
    setopenEditModal(!editModal);
  }

  const onDelete = (food) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        dispatch(deleteProduct({ food }));
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  const resetSearch = () => {
    dispatch(getAllProduct());
  }

  const handleInput = (e) => {
    const { value } = e.target;
    setquery(value);
  }
  const searchSubmit = (e) => {
    e.preventDefault();
    dispatch(searchPD({ value: query }));
  }


  const getName = (food) => {
    const cateName = cateList.find(x => x.id === food.cateId);
    if (cateName.id === 4) {
      return <td><Badge color="primary">uncategorized</Badge></td>
    }
    return cateName && <td>{cateName.name}</td>
  }


  const renderPD = () => {
    const indexOfLastPD = currentPage * itemsPerPage;
    const indexOffFirstPD = indexOfLastPD - itemsPerPage;

    if (isGettingPD || isUpdating || isAdding || isDeleting) {
      return <tr><td><Spinner size="sm" color="primary" /></td></tr>
    }

    if (productsList.length <= 0) {
      return <tr><td>none</td></tr>
    }

    if (filterProduct && filterProduct.length > 0) {
      return filterProduct && filterProduct.slice(indexOffFirstPD, indexOfLastPD).map((food, index) => (
        <Product
          key={index}
          product={food}
          onEdit={toggleEditModal}
          onDelete={onDelete}
          getCategoryName={getName}
        />
      ))
    }

    if (filterProduct && filterProduct.length <= 1) {
      return <tr><td>No match</td></tr>
    }

    return productsList && productsList.slice(indexOffFirstPD, indexOfLastPD).map((food, index) => (
      <Product
        key={index}
        product={food}
        onEdit={toggleEditModal}
        onDelete={onDelete}
        getCategoryName={getName}
      />
    ))
  }


  return (
    <React.Fragment>

      <ProductModal
        isAdd={addModal}
        isEdit={editModal}

        onAdd={onAddProduct}
        onEdit={onEditProduct}

        food={singleFood}

        toggleEdit={toggleEditModal}
        toggleAdd={toggleAddModal} />

      <Table striped>
        <thead>
          <tr>
            <th colSpan="4">
              <SearchBox
                onSubmitSearch={searchSubmit}
                handleSearchInput={handleInput}
                onResetSearch={resetSearch}
              />
            </th>
          </tr>
          <tr>
            <th>#</th>
            <th>Tên Món</th>
            <th>Danh mục</th>
            <th>Ảnh món ăn</th>
            <th>Giá</th>
            <th>Tình trạng</th>
            <th><Button color="primary" onClick={toggleAddModal}><BsDownload /></Button></th>
          </tr>
        </thead>
        <tbody>
          {renderPD()}
        </tbody>
      </Table>

      <Paginate
        itemsPerPage={itemsPerPage}
        totalItem={productsList.length}
        paginate={paginate}
      />
    </React.Fragment>
  )
}



export default Products
