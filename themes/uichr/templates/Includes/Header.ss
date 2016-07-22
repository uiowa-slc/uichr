<header class="header">
	<div class="container">
		<div class="clearfix">
			<a href="{$BaseHref}" class="logo">
				<img src="{$ThemeDir}/images/UICHR-logo.png" alt="Youth Ballet and Community Dance School Logo">
			</a>
			<% with SearchForm %>
				<div class="searchform mobile-hide">
					<form $FormAttributes>
						<label for="divisionsearchinput" class="visuallyhidden">Search</label>
						<input type="search"  id="divisionsearchinput" placeholder="Search" name="Search" class="search-input">
						<input type="submit" class="search-btn visuallyhidden" value="search">
					</form>
				</div>
			<% end_with %>
			<span class="shifter-handle">Menu</span>
        <% include MainNav %>
		</div>
	</div>
</header>