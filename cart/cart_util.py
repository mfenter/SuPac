from inventory.models import Plot


def add_to_cart(cart, name):
    qty = 1
    plot = Plot.objects.get(name=name)

    if cart.products.__contains__(plot):
        return cart
    else:
        cart.add(plot, price=plot.price, quantity=qty)

    return cart


def remove_from_cart(cart, name):
    plot = Plot.objects.get(name=name)
    cart.remove(plot)
    return cart
