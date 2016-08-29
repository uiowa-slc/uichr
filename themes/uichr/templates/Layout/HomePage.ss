<section class="hero">
	<div class="slider slider-for">
	<% loop $Heros.Limit(3) %>
		<div class="hero-top">
			<div class="inner">
				<picture>
					<!--[if IE 9]><video style="display: none;"><![endif]-->
					<source srcset="$HeroPhoto.CroppedFocusedImage(1600,700).URL" media="(min-width: 1200px)">
					<source srcset="$HeroPhoto.CroppedFocusedImage(1200,800).URL" media="(min-width: 768px)">
					<source srcset="$HeroPhoto.CroppedFocusedImage(768,500).URL" media="(min-width: 480px)">
					<!--[if IE 9]></video><![endif]-->
					<img srcset="$HeroPhoto.CroppedFocusedImage(480,300).URL" alt="$Title">
				</picture>
			</div>
			<div class="container">
				<div class="hero-content animated delay">
					<h1 class="hero-title">$HeroTitle</h1>
					<p class="hero-copy">$HeroDescription</p>
					<% if $AssociatedPage %><a href="$AssociatedPage.Link" class="hero-btn">Learn More</a><% end_if %>
				</div>
			</div>
		</div>
	<% end_loop %>
	</div>
	<div class="hero-bot">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ol class="unstyled clearfix hero-nav slider-nav">
						<% loop $Heros.Limit(3) %>
							<li>
								<div>
									<div class="hero-nav-img"><img src="$HeroPhoto.CroppedFocusedImage(212,167).URL" alt=""></div>
									<strong>$HeroTitle</strong>
								</a>
							</div>
						<% end_loop %>
					</ol>
					<div class="hero-overview">
						<p class="hero-overview-copy">$HeroContent</p>
						<% if $HeroContentLinkText %>
							<% if $CarouselAssociatedPage %>
								<a href="$CarouselAssociatedPage.Link" class="hero-overview-link">
									<span class="link">$HeroContentLinkText</span>
								</a>
								<% else %>
									<span class="link">$HeroContentLinkText</span>
							<% end_if %>
						<% end_if %>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<!--workinggroups.jpg-->
<section class="program-container">
	<div class="container">
		<div class="col-sm-12">
			<div class="program-intro clearfix">
				<h3>$ProgramHeading</h3>
				<p>$ProgramContent</p>
			</div>
			<div class="text-container">
				<div class="program-list">
					<ul class="unstyled justify justify-3">
						<% loop $Programs.Limit(3) %>
							<li class="justify-item">
								<a href="$AssociatedPage.Link">
									<div class="program-top">
										<div class="initiative-img">
											<div class="scale" style="background-image: url($ProgramPhoto.CroppedImage(330,225).URL);"></div>
											<h4>$ProgramTitle</h4>
										</div>
									</div>
									<div class="program-bot">
										<p>$ProgramDescription.LimitCharacters(90)</p>
										<span class="diamond"></span>
									</div>
								</a>
							</li>
						<% end_loop %>
					</ul>
				</div>
				<div class="more-programs">
					<div class="program-list">
						<ul class="unstyled justify justify-3">
							<% loop $Programs.Limit(8,3) %>
								<li class="justify-item">
									<a href="$AssociatedPage.Link">
										<div class="program-top">
											<div class="initiative-img">
												<div class="scale" style="background-image: url($ProgramPhoto.CroppedImage(330,225).URL);"></div>
												<h4>$ProgramTitle</h4>
											</div>
										</div>
										<div class="program-bot">
											<p>$ProgramDescription.LimitCharacters(90)</p>
											<span class="diamond"></span>
										</div>
									</a>
								</li>
							<% end_loop %>
						</ul>
					</div>
				</div>
				<p class="text-center" style="margin: 0;">
					<button class="more-link btn btn-link"><span class="visuallyhidden">Show More Programs</span></button>
				</p>
			</div>

		</div>
	</div>
</section>

<section class="home-newsevents">
	<div class="container">
		<div class="row">
			<div class="col-md-6">
				<div class="home-events">
					<h3>UICHR Events <a href="{$BaseHref}events/" class="btn btn-link btn-xs">view all events</a></h3>
					<% with $Page(events) %>
					<% loop $EventList.Limit(2) %>
						<% include EventCard %>
						<%-- <div class="clearfix">
							<% loop $Dates %>
								<p class="date-time">
									<% with $StartDateTime %>
										<span class="">$Format(M)</span><span class="">$Format(j)</span>
									<% end_with %>
								</p>
							<% end_loop %>
							<h4 class=""><a href="$Link">$Title</a></h4>
							<p><% if $Venue %>$Venue.Title<% end_if %></p>
						</div> --%>
					<% end_loop %>
					<% end_with %>
				</div>
			</div>
			<div class="col-md-6">
				<div class="home-news">
					<% with $Page(news) %>
						<% if $AllChildren %>
							<h3>UICHR News <a href="{$BaseHref}news/" class="btn btn-link btn-xs">view all news</a></h3>
							<ul class="unstyled">
								<% loop $BlogPosts.Limit(2) %>
									<div class="newscard clearfix <% if $Photo %>withphoto<% end_if %>">
										<%-- Title --%>
										<h5 class="newscard-title"><a href="$Link">$Title</a></h5>

										<%-- Meta --%>
										<p class="newscard-meta">
											<% if $Credits %>
												<span class="author">by
												<% loop $Credits %><% if not $First && not $Last %>, <% end_if %><% if not $First && $Last %> and <% end_if %><% if $URLSegment %><a href="$URL">$Name.XML</a><% else %>$Name.XML<% end_if %><% end_loop %> <span class="bar">|</span> </span>
											<% end_if %>
											<span class="date">$PublishDate.format("F d, Y")</span>
											<% if $Categories.exists %>
												<span class="bar">|</span>
												<% loop $Categories %>
													<a href="$Link" title="$Title">$Title</a><% if not Last %>, <% else %><% end_if %>
												<% end_loop %>
											<% end_if %>
										</p>
									</div>
								<% end_loop %>
							</ul>
						<% end_if %>
					<% end_with %>
				</div>
			</div>
		</div>
	</div>
</section>
