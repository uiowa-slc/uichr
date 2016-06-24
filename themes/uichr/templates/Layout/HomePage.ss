<section class="hero">
	<div class="hero-top" style="background-image: url({$ThemeDir}/images/hero-1.jpg)">
		<%-- <img src="{$ThemeDir}/images/hero-1.jpg" alt="" class="hero-img"> --%>
		<div class="container">
			<div class="row">
				<div class="col-md-7">
					<div class="hero-content">
						<h1 class="hero-title">New Ideas for a changing world</h1>
						<p class="hero-copy">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."</p>
						<a href="#" class="hero-btn">Eligibility Requirements</a>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="hero-bot">
		<div class="container">
			<div class="row">
				<div class="col-sm-12">
					<ol class="unstyled clearfix hero-nav">
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav1.jpg" alt="">
								<strong>Certificate in Human Rights</strong>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav2.jpg" alt="">
								<strong>Student Internships</strong>
							</a>
						</li>
						<li>
							<a href="#">
								<img src="{$ThemeDir}/images/hero-nav3.jpg" alt="">
								<strong>Weston Essay Prize</strong>
							</a>
						</li>
					</ol>
					<div class="hero-overview">
						<p class="hero-overview-copy">The Human Rights Certificate Program seeks to broaden understanding of human rights issues and to identify solutions to them on an interdisciplinary basis. Labore et dolore magna aliqua enim ad minim veniam.</p>
						<a href="#" class="hero-overview-link"><span class="link">Program Overview</span></a>
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
				<h3>Protecting Human Rights at home and abroad</h3>
				$Content
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
				<p class="text-center" style="margin: 0;"><a href="#" class="more-link btn btn-link"></a></p>
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
										<h4 class="newscard-title"><a href="$Link">$Title</a></h4>

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
