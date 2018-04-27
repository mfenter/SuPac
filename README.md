# SuPac App



### Square SDK Python Install

"You must use the following repo to properly install square"

``$: pip install git+https://github.com/square/connect-python-sdk.git
``


'In site-packages under the carton modules template tag folder
you must replace line 25 to:'

`register.simple_tag(takes_context=True, name=CART_TEMPLATE_TAG_NAME)(get_cart)`

'...in order to use carton tags correctly in django templates.'