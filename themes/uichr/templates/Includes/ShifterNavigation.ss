<div class="shifter-navigation">
	<div class="mobile-navigation">
		<ul class="">
			<li><a href="{$BaseHref}" class="link">Home</a>
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
					<p><span itemprop="streetAddress">$SiteConfig.Address1<br />$SiteConfig.Address2</span><br /><span itemprop="addressLocality">$SiteConfig.City, $SiteConfig.State</span> <span itemprop="postalCode">$SiteConfig.Zip</span></p>
			</div>
		</div>
	</div>
	<hr />
	<div class="contact">
		<div>
			<a href="mailto:$SiteConfig.Email">$SiteConfig.Email</a>
		</div>
		<div>
			<span><a href="tel:$SiteConfig.Phone">$SiteConfig.Phone</a></span>
		</div>
	</div>
</div>