import React from 'react';
import WebNavBar from './WebNavbar';
import { useSelector } from 'react-redux';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import useNavbar from '../../hooks/GeneralHooks/useNavbar';
import useMultilangHook from '../../hooks/LanguageHook/Multilanguages-hook';

const Navbar = () => {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogoutUser, isLoggedIn } = useNavbar();
  const { handleLanguageChange, multiLanguagesData, selectedLang }: any = useMultilangHook();
  const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);
  const cartCount = useSelector(selectCart)?.cartCount;
  const wishlistCount = useSelector(selectWishlist)?.wislistCount;
  return (
    <WebNavBar
      navbarData={navbarData}
      isLoading={isLoading}
      errorMessage={errorMessage}
      selectedCurrencyValue={selectedCurrencyValue}
      handleLogoutUser={handleLogoutUser}
      selectedLanguageData={selectedLanguageData}
      cartCount={cartCount}
      wishlistCount={wishlistCount}
      isLoggedIn={isLoggedIn}
    />
  );
};

export default Navbar;
