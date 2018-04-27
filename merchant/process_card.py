from __future__ import print_function
import uuid
import cgi

import squareconnect
from squareconnect.rest import ApiException
from squareconnect.apis.transactions_api import TransactionsApi
# from squareconnect.apis.locations_api import LocationsApi


def process_card(nonce, total):
        # Create instance of FieldStorage
        form = cgi.FieldStorage()
        # Get data from fields

        total = (int(total) * 100)

        print(nonce, total)

        # The access token to use in all Connect API requests. Use your *sandbox* access
        # token if you're just testing things out.
        squareconnect.configuration.access_token = 'sandbox-sq0atb-SUIeBXJ0Sz6uB20s12ofWQ'
        location_id = 'CBASEDgGKGlB43Ujea2w14XFUcAgAQ'

        api_instance = TransactionsApi()

        idempotency_key = str(uuid.uuid1())

        # Amount represented in lowest unit possible i.e pennies
        amount = {'amount': total, 'currency': 'USD'}
        body = {'idempotency_key': idempotency_key, 'card_nonce': nonce, 'amount_money': amount}

        # The SDK throws an exception if a Connect endpoint responds with anything besides
        # a 200-level HTTP code. This block catches any exceptions that occur from the request.
        try:
            api_response = api_instance.charge(location_id, body)
            res = api_response.transaction
        except ApiException as e:
            # res = "Exception when calling TransactionApi->charge: {}".format(e)
            return e

        # Display the result
        print('Content-type:text/html\r\n\r\n')
        print('<html>')
        print('<head>')
        print('<title>Square Payment</title>')
        print('</head>')
        print('<body>')
        print('<h2>Result: </h2>')
        print('<p>{}</p>'.format(res))
        print('</body>')
        print('</html>')

        return res
