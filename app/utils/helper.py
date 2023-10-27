# @author     : Jackson Zuo
# @time       : 10/5/2023
# @description: helper functions

from config import Config


def allowed_file(filename):
    """
    Check if the given filename is in the list of allowed file extensions.

    Args:
        filename: string

    Returns: bool

    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS
