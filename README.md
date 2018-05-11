# SuPac App



### WARNING!!!

The django-carton package is out of date. To deal with that I forked the
github repo into https://github.com/Daniel-Avila/django-carton.git.

You will need to remove the current django-carton install

 `pip uninstal django-carton`

 and rerun

`pip install -r requirments.txt`

To install the corrected version of django-carton.

I put in a pull request from our fork to the connonical project in the event
they want to update it.

#### NOTE: Disregard the following. It is being left for reference.
'In site-packages under the carton modules template tag folder
you must replace line 25 to:'

`register.simple_tag(takes_context=True, name=CART_TEMPLATE_TAG_NAME)(get_cart)`

'...in order to use carton tags correctly in django templates.'