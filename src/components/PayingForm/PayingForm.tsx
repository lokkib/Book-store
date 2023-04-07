import { useState, useEffect } from 'react'
import Cards from 'react-credit-cards-2'
import * as Yup from 'yup'

import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'

import {
  closePayingForm,
  showSuccessNotification,
} from '../../redux/slices/payingFormSlice'
import ButtonClose from './ButtonClose/ButtonClose'
import styles from './style.module.scss'
import 'react-credit-cards-2/dist/lib/styles.scss'
import { PayingFormProps } from '../../@types/props/PayingFormProps'

const SignupSchema = Yup.object().shape({
  number: Yup.string()
    .min(16, 'Поле должно содержать минимум 16 цифр')
    .required('Поле обязательно для заполнения'),
  name: Yup.string().required('Поле обязательно для заполнения'),
  expiry: Yup.string()
    .min(4, 'Поле должно содержать минимум 4 цифры')
    .required('Поле обязательно для заполнения'),
  cvc: Yup.string()
    .min(3, 'Поле должно содержать минимум 3 цифры')
    .required('Поле обязательно для заполнения'),
})

const PayingForm = ({ onClick }: PayingFormProps) => {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  })

  const dispatch = useDispatch()

  const [successNotIfication, setSuccessNotification] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target

    value = value
      .trimStart()
      .toLocaleUpperCase()
      .replace(/[^a-z]/gi, '')
    setState((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    setTimeout(() => {
      setSuccessNotification(false)
    }, 2000)
  }, [successNotIfication])

  const handleInputCardNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target

    value = value.slice(0, 16)

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChangeCVC = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    value = value.slice(0, 3)
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputChangeExpiry = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = e.target
    value = value.slice(0, 4)
    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: e.target.name }))
  }

  const handleSubmit = () => {
    dispatch(closePayingForm(false))
    dispatch(showSuccessNotification(true))
  }

  return (
    <div className={styles.card__block}>
      <ButtonClose classType="miniCloseLine" onClick={onClick} />
      <div className={styles.card__block__form}>
        <div className={styles.card__block__inner}>
          <Cards
            number={state.number}
            expiry={state.expiry}
            cvc={state.cvc}
            name={state.name}
            focused={state.focus}
          />
        </div>
        <Formik
          initialValues={{
            number: '',
            expiry: '',
            cvc: '',
            name: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, errors, touched }) => (
            <Form className={styles.form}>
              <input
                type="number"
                name="number"
                placeholder="Номер карты"
                value={state.number}
                onChange={(e) => [handleInputCardNumber(e), handleChange(e)]}
                onFocus={handleInputFocus}
              />
              <p className={styles.error}>
                {errors.number && touched.number && errors.number}
              </p>
              <input
                type="text"
                name="name"
                placeholder="Имя владельца карты"
                value={state.name}
                onChange={(e) => [handleInputChange(e), handleChange(e)]}
                onFocus={handleInputFocus}
              />
              <p className={styles.error}>
                {errors.name && touched.name && errors.name}
              </p>
              <input
                type="number"
                name="expiry"
                placeholder="Действительна до"
                pattern="\d\d/\d\d"
                value={state.expiry}
                onChange={(e) => [handleInputChangeExpiry(e), handleChange(e)]}
                onFocus={handleInputFocus}
              />
              <p className={styles.error}>
                {errors.expiry && touched.expiry && errors.expiry}
              </p>
              <input
                type="number"
                name="cvc"
                placeholder="CVC"
                value={state.cvc}
                onChange={(e) => [handleInputChangeCVC(e), handleChange(e)]}
                onFocus={handleInputFocus}
              />
              <p className={styles.error}>
                {errors.cvc && touched.cvc && errors.cvc}
              </p>
              <div className={styles.formActions}>
                <button type="submit">Оплатить</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default PayingForm
