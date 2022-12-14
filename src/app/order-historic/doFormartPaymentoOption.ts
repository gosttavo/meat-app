  export function doFormatPaymentOption(paymentOption) {
    let payment: string;

    if (paymentOption === 'MON') {
      payment= 'DINHEIRO';
    }
    else if (paymentOption === 'DEB') {
      payment = 'CARTÃO DÉBITO';
    }
    else if (paymentOption === 'CRED') {
      payment = 'CARTÃO CRÉDITO';
    }
    else if (paymentOption === 'PIX') {
      payment = 'PIX';
    }

    return payment;
  }