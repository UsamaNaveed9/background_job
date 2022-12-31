from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in background_job/__init__.py
from background_job import __version__ as version

setup(
	name="background_job",
	version=version,
	description="Submit/ Cancel Sales invoices in the Background jobs",
	author="smb",
	author_email="usamanaveed9263@gmail.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
