<div class="shifter-navigation">
	<div class="reg-login clearfix">
		<a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Activate" class="">Register</a>
		<a href="https://osl.iowa.uiowa.edu/dancemarathon/Account/Login" class="">Login</a>
	</div>
	<div class="mobile-navigation">
		<ul class="">
			<% loop Menu(1) %>
				<li <% if $LinkOrSection = "section" %>class="active"<% end_if %>><a href="$Link" class="link">$MenuTitle</a>
				</li>
			<% end_loop %>
		</ul>
	</div>
	<div class="shifter-address">
		<div class="contain">
			<div itemscope itemtype="http://schema.org/Organization">
				<h3 itemprop="name">$SiteConfig.Title</h3>

				<div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
					<p><span itemprop="streetAddress">$SiteConfig.Address1<br />$SiteConfig.Address2</span><br />
					<a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a><br />
					<a href="tel:$SiteConfig.Phone">$SiteConfig.Phone</a><br /></p>
			</div>
			<a href="https://osl.iowa.uiowa.edu/dancemarathon/donate" class="top-donate">Donate</a><br />
		</div>
	</div>
</div>