/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { notification } from "antd";
import { AuthUtils } from "../../utilities/Auth.util";
import { CategoriesServices } from "../../services/categories.services";
import { AuthService } from "../../services/auth.service";
import {
  AuthenticatedRoutesNames,
  UnAuthenticatedRoutesNames,
} from "../../utilities/util.constant";
import "../../assets/frontend/css/bootstrap.min.css";
import "../../assets/frontend/css/blog-home.css";

function FrontendLayout() {
  const [searchInput, setSearchInput] = useState(null);
  const navigate = useNavigate();
  const { data: categoriesData } = useQuery(
    "getCategories",
    CategoriesServices.getCategories
  );

  // let subjectName = "javascript";
  // subjectName = "react js"

  //memorize based on resultsData
  const getCategories = useMemo(
    () => categoriesData?.data?.results,
    [categoriesData?.data?.results]
  );

  const ShowFiveCategories = useMemo(
    () => categoriesData?.data?.results?.splice(0, 5),
    [categoriesData?.data?.results]
  );

  const onSearchSubmitHandler = (event) => {
    event.preventDefault();
    if (!searchInput) {
      notification.warning({
        message: "please fill the search input field",
        placement: "topRight",
      });
      return;
    }
    navigate(
      UnAuthenticatedRoutesNames.SEARCH_DETAIL.replace(
        ":searchDetail",
        searchInput
      )
    );
  };

  return (
    <>
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button
              type="button"
              class="navbar-toggle"
              data-toggle="collapse"
              data-target="#bs-example-navbar-collapse-1"
            >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <Link class="navbar-brand" to={UnAuthenticatedRoutesNames.HOME}>
              Home
            </Link>
          </div>

          <div
            class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1"
          >
            <ul class="nav navbar-nav">
              {ShowFiveCategories?.map((singleCategory) => (
                <li>
                  <Link
                    to={UnAuthenticatedRoutesNames.CATEGORY_DETAIL.replace(
                      ":id",
                      singleCategory.cat_id
                    )}
                  >
                    {singleCategory.cat_title}
                  </Link>
                </li>
              ))}
              {AuthService.isUserIsLoggedIn() ? (
                <>
                  <li>
                    <Link
                      class="navbar-brand"
                      to={AuthenticatedRoutesNames.HOME}
                    >
                      Admin
                    </Link>
                  </li>
                  <li>
                    <a
                      onClick={(event) => {
                        event.preventDefault();
                        AuthUtils.removeToken();
                        window.location.reload(true);
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={UnAuthenticatedRoutesNames.LOGIN}>Login</Link>
                  </li>
                  <li>
                    <Link to={UnAuthenticatedRoutesNames.REGISTER}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div class="container" style={{ marginTop: "70px" }}>
        <div class="row">
          <div class="col-md-8">
            <Outlet />
          </div>

          <div class="col-md-4">
            <div class="well">
              <form onSubmit={onSearchSubmitHandler}>
                <h4>Post Search</h4>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    onChange={(event) => {
                      event.preventDefault();
                      setSearchInput(event.target.value);
                    }}
                  />
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="submit">
                      <span class="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </form>
            </div>

            <div class="well">
              <h4>Post Categories</h4>
              <div class="row">
                <div class="col-lg-12">
                  <ul class="list-unstyled">
                    {getCategories?.length > 0 &&
                      getCategories?.map((singleCategory, index) => (
                        <li>
                          <Link
                            to={UnAuthenticatedRoutesNames.CATEGORY_DETAIL.replace(
                              ":id",
                              singleCategory.cat_id
                            )}
                          >
                            {index + 1} - {singleCategory.cat_title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />

        <footer>
          <div class="row">
            <div class="col-lg-12">
              <p>Copyright &copy; Your Website 2014</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FrontendLayout;
