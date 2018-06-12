from django.db import models
from django.contrib.auth.models import User


class CelestialBody(models.Model):

    def __str__(self):
        return self.name

    """Identifies celestial bodies"""
    name = models.CharField(max_length=26, unique=True)
    parent_body = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    image_name = models.CharField(max_length=64)
    description = models.TextField(max_length=256, default='')
    aphelion = models.FloatField(default=0.0, help_text="Furthest Distance from the parent body")
    average_distance = models.FloatField(default=0, help_text="Average distance from the parent body")
    density = models.IntegerField(default=0, help_text="The average density (mass divided by volume) of the whole "
                                                       "planet (not including the atmosphere for the terrestrial "
                                                       "planets) in kilograms per cubic meter or pounds per cubic" 
                                                       "foot.")
    diameter = models.IntegerField(default=0, help_text="The diameter of the planet at the equator, the distance "
                                                        "through the center of the planet from one point on the"
                                                        "equator to the opposite side, in kilometers or miles.")
    escape_velocity = models.FloatField(default=0.0, help_text="Initial velocity, in kilometers per second, needed "
                                                               "at the surface "
                                                               "(at the 1 bar pressure level for the gas giants)"
                                                               "to escape the body's gravitational pull, ignoring"
                                                               " atmospheric drag.")
    global_magnetic_field = models.BooleanField(default=True, help_text="This tells whether the planet has a "
                                                                        "measurable large-scale magnetic field. "
                                                                        "eg. Mars and the Moon have localized "
                                                                        "regional magnetic fields but no global "
                                                                        "field.")
    gravity = models.FloatField(default=0.0, help_text="The gravitational acceleration on the surface at the "
                                                       "equator in meters per second squared or feet per second "
                                                       "squared, including the effects of rotation. For the gas giant "
                                                       "planets the gravity is given at the 1 bar pressure level in "
                                                       "the atmosphere. The gravity on Earth is designated as "
                                                       "1 \"G\", so the Earth ratio fact sheets gives the gravity "
                                                       "of the other planets in G's.")
    length_of_day = models.FloatField(default=0.0, help_text="The average time in hours for the Parent Body to move "
                                                             "from the noon position in the sky at a point on the "
                                                             "equator back to the same position.")
    mass = models.FloatField(default=0.0, help_text="This is the mass of the planet in septillion "
                                                    "(1 followed by 24 zeros) kilograms or sextillion "
                                                    "(1 followed by 21 zeros) tons. Strictly speaking tons are "
                                                    "measures of weight, not mass, but are used here to represent the "
                                                    "mass of one ton of material under Earth gravity.")
    mean_temperature = models.IntegerField(default=0, help_text="This is the average temperature over the whole "
                                                                "planet's surface "
                                                                "(or for the gas giants at the one bar level) "
                                                                "in degrees C (Celsius or Centigrade). "
                                                                "For Mercury and the Moon, for example, this is an "
                                                                "average over the sunlit (very hot) and dark "
                                                                "(very cold) hemispheres and so is not representative "
                                                                "of any given region on the planet, and most of the "
                                                                "surface is quite different from this average value. "
                                                                "As with the Earth, there will tend to be variations "
                                                                "in temperature from the equator to the poles, from "
                                                                "the day to night sides, and seasonal changes on most "
                                                                "of the planets.")
    number_of_moons = models.IntegerField(default=0, help_text="This gives the number of IAU officially confirmed "
                                                               "moons orbiting the planet. New moons are still being "
                                                               "discovered.")
    obliquity_to_orbit = models.FloatField(default=0.0, help_text="The angle in degrees the axis of a planet "
                                                                  "(the imaginary line running through the center "
                                                                  "of the planet from the north to south poles) is "
                                                                  "tilted relative to a line perpendicular to the "
                                                                  "planet's orbit around the Sun, north pole defined "
                                                                  "by right hand rule. *Venus rotates in a "
                                                                  "retrograde direction, opposite the other planets, "
                                                                  "so the tilt is almost 180 degrees, it is considered "
                                                                  "to be spinning with its \"top\", or north pole "
                                                                  "pointing \"downward\" (southward). Uranus rotates "
                                                                  "almost on its side relative to the orbit, Pluto is "
                                                                  "pointing slightly \"down\". The ratios with Earth "
                                                                  "refer to the axis without reference to north or "
                                                                  "south.")
    orbital_eccentricity = models.FloatField(default=0.0, help_text="This is a measure of how far a planet's orbit "
                                                                    "about the Sun (or the Moon's orbit about the "
                                                                    "Earth) is from being circular. The larger the "
                                                                    "eccentricity, the more elongated is the orbit, an "
                                                                    "eccentricity of 0 means the orbit is a perfect "
                                                                    "circle. There are no units for eccentricity.")
    orbital_inclination = models.FloatField(default=0.0, help_text="The angle in degrees at which a planets orbit "
                                                                   "around the Sun is tilted relative to the ecliptic "
                                                                   "plane. The ecliptic plane is defined as the plane "
                                                                   "containing the Earth's orbit, so the Earth's "
                                                                   "inclination is 0.")
    orbital_period = models.FloatField(default=0.0, help_text="This is the time in Earth days for a planet to orbit "
                                                             "the "
                                                            "Sun from one vernal equinox to the next. Also known as "
                                                            "the tropical orbit period, this is equal to a year on "
                                                            "Earth. * For the Moon, the sidereal orbit period, "
                                                            "the time to orbit once relative to the fixed background "
                                                            "stars, is given. The time from full Moon to full Moon, "
                                                            "or synodic period, is 29.53 days. For Pluto, the tropical "
                                                            "orbit period is not well known, the sidereal orbit "
                                                            "period is used.")
    orbital_velocity = models.FloatField(default=0.0, help_text="The average velocity or speed of the planet as it "
                                                              "orbits the Sun, in kilometers per second or miles "
                                                              "per second.")
    perihelion = models.FloatField(default=0.0, help_text="The closest and furthest points in a planet's orbit about "
                                                          "the Sun, see \"Distance from Sun\" above.* For the Moon, "
                                                          "the closest and furthest points to Earth are given, "
                                                          "known as the \"Perigee\" and \"Apogee\" respectively.")
    ring_system = models.BooleanField(default=False, help_text="This tells whether a planet has a set of rings around "
                                                               "it, Saturn being the most obvious example.")
    rotation_period = models.FloatField(default=0.0, help_text="This is the time it takes for the planet to complete "
                                                               "one rotation relative to the fixed background stars "
                                                               "(not relative to the Sun) in hours. Negative numbers "
                                                               "indicate retrograde (backwards relative to the Earth) "
                                                               "rotation.")
    surface_pressure = models.FloatField(default=0, help_text="This is the atmospheric pressure (the weight of the "
                                                                "atmosphere per unit area) at the surface of the "
                                                                "planet in bars or atmospheres. *The surfaces of "
                                                                "Jupiter, Saturn, Uranus, and Neptune are deep in "
                                                                "the atmosphere and the location and pressures are "
                                                                "not known.")


class Plot(models.Model):

    def __str__(self):
        return self.name

    """Identifies a plot on a body and an owner if there is one"""
    name = models.CharField(max_length=26)
    parent = models.ForeignKey(CelestialBody, on_delete=models.PROTECT)
    location = models.CharField(max_length=140)
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    price = models.FloatField(default=25.00)
