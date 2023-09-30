/**
 * Export reducers from ducks modules of different containers (i.e. default export)
 * We are following Ducks module proposition:
 * https://github.com/erikras/ducks-modular-redux
 */
import CheckoutPage from './CheckoutPage/CheckoutPage.duck';
import ContactDetailsPage from './ContactDetailsPage/ContactDetailsPage.duck';
import EditListingPage from './EditListingPage/EditListingPage.duck';
import InboxPage from './InboxPage/InboxPage.duck';
import ListingPage from './ListingPage/ListingPage.duck';
import ManageListingsPage from './ManageListingsPage/ManageListingsPage.duck';
import PasswordChangePage from './PasswordChangePage/PasswordChangePage.duck';
import PasswordRecoveryPage from './PasswordRecoveryPage/PasswordRecoveryPage.duck';
import PasswordResetPage from './PasswordResetPage/PasswordResetPage.duck';
import PaymentMethodsPage from './PaymentMethodsPage/PaymentMethodsPage.duck';
import ProfilePage from './ProfilePage/ProfilePage.duck';
import ProfileSettingsPage from './ProfileSettingsPage/ProfileSettingsPage.duck';
import SearchPage from './SearchPage/SearchPage.duck';
import StripePayoutPage from './StripePayoutPage/StripePayoutPage.duck';
import TransactionPage from './TransactionPage/TransactionPage.duck';
import DeleteAccountPage from './DeleteAccountPage/DeleteAccountPage.duck';
import SalesAccountPage from './SalesAccountPage/SalesAccountPage.duck';
import SEOPage from './SEOPage/SEOPage.duck';
import AdsPage from './AdsPage/AdsPage.duck';
import RefundsPage from './RefundsPage/RefundsPage.duck';

import ProductPage from './ProductPage/ProductPage.duck';
import CartsPage from './CartsPage/CartsPage.duck';
import PurchasesPage from './PurchasesPage/PurchasesPage.duck';
import WishlistPage from './WishlistPage/WishlistPage.duck';
import CanceledPage from './CanceledPage/CanceledPage.duck';

export {
  CheckoutPage,
  ContactDetailsPage,
  EditListingPage,
  InboxPage,
  ListingPage,
  ManageListingsPage,
  PasswordChangePage,
  PasswordRecoveryPage,
  PasswordResetPage,
  PaymentMethodsPage,
  ProfilePage,
  ProfileSettingsPage,
  SearchPage,
  StripePayoutPage,
  TransactionPage,
  DeleteAccountPage,
  SalesAccountPage,
  SEOPage,
  AdsPage,
  RefundsPage,
  ProductPage,
  CartsPage,
  PurchasesPage,
  WishlistPage,
  CanceledPage,

};
