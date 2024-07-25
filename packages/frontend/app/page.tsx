'use client'

import enTranslations from '@shopify/polaris/locales/en.json';
import { AppProvider } from '@shopify/polaris';
import OrdersPage from '@/components/ordersPage';


export default function Page() {
  return (

    <AppProvider i18n={enTranslations}>
      <OrdersPage />
    </AppProvider>
  )
}