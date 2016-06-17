<% if $MainPhoto %>
	<div class="page-photo">
		<picture class="picture">
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="$MainPhoto.CroppedFocusedImage(1200,375).URL" media="(min-width: 980px)">
			<source srcset="$MainPhoto.CroppedFocusedImage(980,375).URL" media="(min-width: 480px)">
			<!--[if IE 9]></video><![endif]-->
			<img srcset="$MainPhoto.CroppedFocusedImage(480,300).URL" alt="$Title">
		</picture>
	</div>
<% end_if %>