<?php

class StudentAdmin extends ModelAdmin {
	private static $menu_title = 'Students';

	private static $url_segment = 'students';

	private static $managed_models = array(
		'Student',
	);

	// private static $menu_icon = '';
}