<script>
function calculateIncomeTax() {
    var grossIncome = document.getElementById('gross-income')
    var dependents = document.getElementById('dependents')
    var totalincome = document.getElementById('total-income')
    var afterIncomeTax = document.getElementById('after-income-tax')
    var socialInsurance = document.getElementById('social-insurance')
    var healthInsurance = document.getElementById('health-insurance')
    var unemployedInsurance = document.getElementById('unemployed-insurance')
    var beforeTaxIncome = document.getElementById('before-tax-income')
    var selfDeduct = document.getElementById('self-deduct')
    var dependentsDeduct = document.getElementById('dependents-deduct')
    var personalTax = document.getElementById('personal-tax')
    var region = document.querySelector('input[name="region"]:checked').value
    var bracket1 = document.getElementById('bracket1')
    var bracket2 = document.getElementById('bracket2')
    var bracket3 = document.getElementById('bracket3')
    var bracket4 = document.getElementById('bracket4')
    var bracket5 = document.getElementById('bracket5')
    var bracket6 = document.getElementById('bracket6')
    var bracket7 = document.getElementById('bracket7')
    let grossIncomeValue = parseFloat(grossIncome.value.replace(/,/g, ''))
    let dependentsValue = parseInt(dependents.value)
    if (dependentsValue < 0) {
        window.$wireui.notify({
        title: 'Thông báo',
        description: 'Số lượng người phụ thuộc phải lớn hơn hoặc bằng không',
        icon: 'info',
        })
        return (dependents.value = 0)
    }
    if (dependentsValue > 10000) {
        window.$wireui.notify({
        title: 'Thông báo',
        description: 'Bạn có quá nhiều người phụ thuộc, vui lòng kiểm tra lại',
        icon: 'info',
        })
        return (dependents.value = 10000)
    }
    if (grossIncomeValue < 0) {
        window.$wireui.notify({
        title: 'Thông báo',
        description: 'Thu nhập phải lớn hơn hoặc bằng không',
        icon: 'info',
        })
        return (grossIncome.value = 0)
    }
    if (grossIncomeValue > 200000000000) {
        window.$wireui.notify({
        title: 'Thông báo',
        description:
            'Thu nhập của bạn thật khủng, hãy cân nhắc mua cổ phần VietGigs!',
        icon: 'info',
        })
        return (grossIncome.value = 200000000000)
    }
    if (isNaN(dependentsValue)) {
        dependentsValue = 0
        dependentsDeduct = 0
    } else {
        dependentsDeduct = dependentsValue * 4400000
    }
    if (!isNaN(grossIncomeValue) && !isNaN(dependentsValue)) {
        let socialInsuranceValue = Math.round(grossIncomeValue * 0.08)
        let healthInsuranceValue = Math.round(grossIncomeValue * 0.015)
        let unemployedInsuranceValue = Math.round(grossIncomeValue * 0.01)
        if (socialInsuranceValue > 2880000) {
        socialInsuranceValue = 2880000
        }
        if (healthInsuranceValue > 540000) {
        healthInsuranceValue = 540000
        }
        if (unemployedInsuranceValue > 936000 && region == 1) {
        unemployedInsuranceValue = 936000
        } else {
        if (unemployedInsuranceValue > 832000 && region == 2) {
            unemployedInsuranceValue = 832000
        } else {
            if (unemployedInsuranceValue > 728000 && region == 3) {
            unemployedInsuranceValue = 728000
            } else {
            if (unemployedInsuranceValue > 650000 && region == 4) {
                unemployedInsuranceValue = 650000
            }
            }
        }
        }
        let beforeTaxIncomeValue = Math.round(grossIncomeValue - socialInsuranceValue - healthInsuranceValue - unemployedInsuranceValue)
        let afterIncomeTax = Math.round(beforeTaxIncomeValue - 11000000 - dependentsDeduct)
        let afterIncomeTaxValue
        if (afterIncomeTax <= 0) {
        afterIncomeTaxValue = 0
        } else {
        afterIncomeTaxValue = afterIncomeTax
        }
        let bracket1Value = 0
        let bracket2Value = 0
        let bracket3Value = 0
        let bracket4Value = 0
        let bracket5Value = 0
        let bracket6Value = 0
        let bracket7Value = 0
        if (afterIncomeTax > 80000000) {
        bracket7Value = Math.round((afterIncomeTax - 80000000) * 0.35)
        afterIncomeTax = 80000000
        }
        if (afterIncomeTax > 52000000) {
        bracket6Value = Math.round((afterIncomeTax - 52000000) * 0.3)
        afterIncomeTax = 52000000
        }
        if (afterIncomeTax > 32000000) {
        bracket5Value = Math.round((afterIncomeTax - 32000000) * 0.25)
        afterIncomeTax = 32000000
        }
        if (afterIncomeTax > 18000000) {
        bracket4Value = Math.round((afterIncomeTax - 18000000) * 0.2)
        afterIncomeTax = 18000000
        }
        if (afterIncomeTax > 10000000) {
        bracket3Value = Math.round((afterIncomeTax - 10000000) * 0.15)
        afterIncomeTax = 10000000
        }
        if (afterIncomeTax > 5000000) {
        bracket2Value = Math.round((afterIncomeTax - 5000000) * 0.1)
        afterIncomeTax = 5000000
        }
        if (afterIncomeTax > 0) {
        bracket1Value = Math.round(afterIncomeTax * 0.05)
        }
        let personalTaxValue =
        bracket1Value +
        bracket2Value +
        bracket3Value +
        bracket4Value +
        bracket5Value +
        bracket6Value +
        bracket7Value
        totalincome.textContent = grossIncomeValue.toLocaleString('en-US') + 'đ'
        afterIncomeTax.textContent = afterIncomeTaxValue.toLocaleString('en-US') + 'đ'
        socialInsurance.textContent = socialInsuranceValue.toLocaleString('en-US') + 'đ'
        healthInsurance.textContent = healthInsuranceValue.toLocaleString('en-US') + 'đ'
        unemployedInsurance.textContent = unemployedInsuranceValue.toLocaleString('en-US') + 'đ'
        beforeTaxIncome.textContent = beforeTaxIncomeValue.toLocaleString('en-US') + 'đ'
        selfDeduct.textContent = (11000000).toLocaleString('en-US') + 'đ'
        dependentsDeduct.textContent = dependentsDeduct.toLocaleString('en-US') + 'đ'
        personalTax.textContent = personalTaxValue.toLocaleString('en-US') + 'đ'
        bracket1.textContent = bracket1Value.toLocaleString('en-US') + 'đ'
        bracket2.textContent = bracket2Value.toLocaleString('en-US') + 'đ'
        bracket3.textContent = bracket3Value.toLocaleString('en-US') + 'đ'
        bracket4.textContent = bracket4Value.toLocaleString('en-US') + 'đ'
        bracket5.textContent = bracket5Value.toLocaleString('en-US') + 'đ'
        bracket6.textContent = bracket6Value.toLocaleString('en-US') + 'đ'
        bracket7.textContent = bracket7Value.toLocaleString('en-US') + 'đ'
    } else {
        totalincome.textContent = '0đ'
        afterIncomeTax.textContent = '0đ'
        socialInsurance.textContent = '0đ'
        healthInsurance.textContent = '0đ'
        unemployedInsurance.textContent = '0đ'
        beforeTaxIncome.textContent = '0đ'
        selfDeduct.textContent = '0đ'
        dependentsDeduct.textContent = '0đ'
        personalTax.textContent = '0đ'
        bracket1.textContent = '0đ'
        bracket2.textContent = '0đ'
        bracket3.textContent = '0đ'
        bracket4.textContent = '0đ'
        bracket5.textContent = '0đ'
        bracket6.textContent = '0đ'
        bracket7.textContent = '0đ'
    }
    }
    document.getElementById('gross-income').addEventListener('input', calculateIncomeTax)
    document.getElementById('dependents').addEventListener('input', calculateIncomeTax)
    document.querySelectorAll('input[name="region"]').forEach((regionValue) => {
        regionValue.addEventListener('change', calculateIncomeTax)
    })
    console.log('Xin chào! Có vẻ như bạn đang tò mò về cách hoạt động của VietGigs. Nếu bạn muốn xem mã nguồn của công cụ này, bạn có thể lấy mã nguồn tại https://github.com/VietGigsJSC/Vietnam-Tax-Caculator')
</script>
<script type="text/javascript">
    document.getElementById('gross-income').addEventListener('input', function(e) {
        let value = e.target.value.replace(/,/g, '');
        // Check if the value is a number
        if (!isNaN(value) && value) {
            // Limit the length to 12 numbers
            value = value.length > 12 ? value.substr(0, 12) : value;
            e.target.value = parseFloat(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
            e.target.value = '';
        }
    });
</script>
