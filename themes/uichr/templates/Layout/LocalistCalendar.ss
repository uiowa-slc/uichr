<main class="main" role="main">
	<header class="page-header">
		<div class="container">
			<h1 class="page-title">$Title</h1>
			<% if $ClassName != "HomePage" %>$Breadcrumbs<% end_if %>
			<% include HeaderPhoto %>
		</div>
	</header>
	<section class="container page-content">
		<div class="row">
			<!-- Main Content -->
			<h3 id="main-content" class="sr-only" tabindex="-1">Main Content</h3>
			<div class="col-lg-8">

				$Content
				$Form

				<% loop $EventList %>
					<% include EventCard %>
				<% end_loop %>

				<%-- <div class="">
					<% loop $EventList %>
						<div class=" clearfix <% if $Photo %>withphoto<% end_if %>">
							<div class="">
								<h4 class=""><a href="$Link">$Title</a></h4>
								<% loop $Dates %>
									<p class="date-time">
										<% with $StartDateTime %>
											<time itemprop="startDate" datetime="$Format(c)">
												$Format(l), $Format(F) $Format(j)
											</time>
											 <br />$Format("g:i A")
										<% end_with %>
										<% if $EndTime %>
											<% with $EndTime %>
												- $Format("g:i A")
											<% end_with %>
										<% end_if %>
										<% if $EndDate %>
											until
											<% with $EndDate %>
												<time itemprop="endDate" datetime="$Format(c)">
													$Format(l), $Format(F) $Format(j)
												</time>
												<br />$Format("g:i A")
											<% end_with %>
										<% end_if %>
									</p>
								<% end_loop %>
								<p>$Venue.Title</p>
							</div>
						</div>
					<% end_loop %>
				</div> --%>
			</div>

			<!-- Side Bar -->
			<% include SideBar %>


		</div><!-- end .row -->
	</section>
</main><!-- end .container -->
<% include RelatedNewsEntries %>